# boss: 71 hp, 10 damage
# self: 50 hp, 500 mana

# Magic Missile: -53 mana, 4 damage
# Drain: -73 mana, 2 damage, +2 HP

# Effects:
# Shield: -113 mana, 6 turns, armor +7 (while active)
# Poison: -173 mana, 6 turns, 3 damage/turn
# Recharge: -229 mana, 5 turns, gives 101 mana
# (name, turns left)

import copy
import itertools

castable = [
	('missile', 53),
	('drain', 73),
	('shield', 113),
	('poison', 173),
	('recharge', 229)
]

def cast(player, boss, spell):
	print "Casting:", spell[0]

	player['mana'] -= spell[1]
	if spell[0] == 'shield':
		player['armor'] += 7
		player['effects'].append(('shield', 6))
	elif spell[0] == 'poison':
		player['effects'].append(('poison', 6))
	elif spell[0] == 'recharge':
		player['effects'].append(('recharge', 5))
	elif spell[0] == 'drain':
		player['hp'] += 2
		boss['hp'] -= 2
	elif spell[0] == 'missile':
		boss['hp'] -= 4

def simulateTurn(player, boss, isPlayerTurn):
	for effect in player['effects']:
		effect[1] -= 1 # Deduct turns
		if effect[0] == 'poison':
			boss['hp'] -= 3
		elif effect[0] == 'recharge':
			player['mana'] += 101
		elif effect[0] == 'shield' and effect[1] == 0:
			player['armor'] -= 7

	player['effects'] = filter(lambda effect: effect[1] > 0, player['effects'])

	if isPlayerTurn:
		canCast = filter(lambda a: a[1] <= player['mana'] and a[1] not in player['effects'], castable)
		if len(canCast) > 1:
			cast(player, boss, canCast[0])
	else:
		player['hp'] -= min(1, boss['damage'] - player['armor'])

	print player, boss, isPlayerTurn

	if player['hp'] <= 0 or boss['hp'] <= 0:
		return player['hp'] > 0 # Did player win?

	return simulateTurn(player, boss, not isPlayerTurn)

player = { 'hp': 50, 'mana': 500, 'armor': 0, 'effects': [] }
boss = { 'hp': 71, 'damage': 10 }

# print "Won?:", simulateTurn(player.copy(), boss.copy(), True)
