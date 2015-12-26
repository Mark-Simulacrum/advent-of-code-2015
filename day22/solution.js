const spells = [
	{
		cost: 53,
		effect: (me, opponent) => {
            opponent.damage(4)
        }
	},
	{
		cost: 73,
		effect: (me, opponent) => {
            opponent.damage(2);
            me.hp += 2;
        }
	},
	{
		cost: 113,
		start: (me, opponent) => me.armor += 7,
		effect: (me, opponent) => {},
		end: (me, opponent) => me.armor -= 7,
		duration: 6
	},
	{
		cost: 173,
		effect: (me, opponent) => opponent.damage(3),
		duration: 6
	},
	{
		cost: 229,
		effect: (me, opponent) => me.mana += 101,
		duration: 5
	}
];

class Wizard {
    constructor(hp, mana) {
        this.hp = hp;
        this.mana = mana;

        this.spent = 0;
        this.armor = 0;
        this.activeSpells = [];
    }

    clone() {
        let newWizard = new Wizard(this.hp, this.mana);

        newWizard.armor = this.armor;
        newWizard.spent = this.spent;
        newWizard.activeSpells = this.activeSpells.map(a => Object.assign({}, a)); // Copy each active spell

        return newWizard;
    }

    static isSpellEffect(spell) {
        return spell.duration;
    }

    attack(opponent, spellIndex) {
        let spell = spells[spellIndex];
        this.spent += spell.cost;
        this.mana -= spell.cost;

        if (Wizard.isSpellEffect(spell)) {
            let newSpell = {
                idx: spellIndex,
                effect: spell.effect,
                duration: spell.duration
            };

            if (spell.start) {
                spell.start(this, opponent);
            }

            if (spell.end) {
                newSpell.end = spell.end;
            }

            this.activeSpells.push(newSpell);
        } else { // if instant spell
            spell.effect(this, opponent);
        }
    }

    damage(amount) {
        if (this.armor > amount) {
            this.hp -= 1;
        } else {
            this.hp -= amount - this.armor;
        }
    }

    applyEffects(opponent) {
        let activeSpells = [];
        for (var i = 0; i < this.activeSpells.length; i++) {
            var spell = this.activeSpells[i];

            // No need to check for spell duration, anything that is 0 or less
            // will be eliminated in the filter later

            spell.duration--;
            spell.effect(this, opponent);

            if (spell.duration === 0 && spell.end) {
                spell.end(this, opponent);
            }

            if (spell.duration > 0) {
                activeSpells.push(spell);
            }
        }

        this.activeSpells = activeSpells;
    }
}

class Boss {
    constructor(hp, damageAmount) {
        this.hp = hp;
        this.damageAmount = damageAmount;
    }

    attack(opponent, spellIndex) {
        opponent.damage(this.damageAmount);
    }

    damage(amount) {
        this.hp -= amount;
    }

    clone() {
        return new Boss(this.hp, this.damageAmount);
    }
}

let me = new Wizard(50, 500);
let boss = new Boss(71, 10);

let cheapestSpent = Infinity;

function playAllGames(me, boss, isHardMode) {
    for (let i = 0; i < spells.length; i++) {
        if (spells[i].cost > me.mana) continue;

    	let shouldContinue = false;
    	for (let j = 0; j < me.activeSpells.length; j++) {
    		let spell = me.activeSpells[j];

            // Spell has at least one turn left
            // and spell is current spell
    		if (spell.duration > 1 && spell.idx === i) {
    			shouldContinue = true;
    			break;
    		}
    	}
        if (shouldContinue) continue;

        let newMe = me.clone();
        let newBoss = boss.clone();

        if (isHardMode) {
            newMe.hp--;
        }

        newMe.applyEffects(newBoss);
        newMe.attack(newBoss, i);

        newMe.applyEffects(newBoss);
        newBoss.attack(newMe);

        if (newBoss.hp <= 0) {
            cheapestSpent = Math.min(cheapestSpent, newMe.spent);
        }

        if (newMe.hp > 0 && newBoss.hp > 0 && newMe.spent < cheapestSpent) {
            playAllGames(newMe, newBoss, isHardMode);
        }
    }
}

playAllGames(me, boss);
console.log("Part 1:", cheapestSpent);
cheapestSpent = Infinity;
playAllGames(me, boss, true);
console.log("Part 2:", cheapestSpent);
