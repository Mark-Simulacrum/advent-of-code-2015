fn has_double_char(line: &str) -> bool {
    let mut previous_char = ' ';
    for c in line.chars() {
        if c == previous_char {
            return true;
        }
        previous_char = c;
    };

    false
}

fn contains_3_vowels(line: &str) -> bool {
    line.chars().filter(|&c| "aeiou".contains(c)).count() >= 3
}

fn has_bad_string(line: &str) -> bool {
    line.contains("ab") || line.contains("cd") || line.contains("pq") || line.contains("xy")
}

fn is_nice_part1(line: &str) -> bool {
    contains_3_vowels(&line) && !has_bad_string(&line) && has_double_char(&line)
}

fn has_double_pair(line: &str) -> bool {
    let mut previous_char = ' ';
    for c in line.chars() {
        let mut joined_str = String::new();
        joined_str.push(previous_char);
        joined_str.push(c);

        if line.matches(&joined_str).count() > 1 {
            return true;
        }
        previous_char = c;
    };

    false
}

fn has_skip_pair(line: &str) -> bool {
    let mut pre_previous_char = ' ';
    let mut previous_char = ' ';
    for c in line.chars() {
        if c == pre_previous_char {
            return true;
        }
        pre_previous_char = previous_char;
        previous_char = c;
    };

    false
}

fn is_nice_part2(line: &str) -> bool {
    has_double_pair(&line) && has_skip_pair(&line)
}

fn main() {
    let input: &str = include_str!("data");

    let nice_lines_part1 = input.lines().filter(|&line| is_nice_part1(line)).count();
    let nice_lines_part2 = input.lines().filter(|&line| is_nice_part2(line)).count();

    println!("Part 1: {}", nice_lines_part1);
    println!("Part 2: {}", nice_lines_part2);
}
