use std::io::prelude::*;
use std::fs::File;

fn main() {
    let mut f = File::open("data").ok().unwrap();
    let mut input = String::new();

    f.read_to_string(&mut input).ok();

    let mut paper_needed = 0;
    let mut ribbon_needed = 0;

    for line in input.lines() {
        let mut dimensions: Vec<u32> = line
            .split('x')
            .map(|dimension| dimension.parse::<u32>().unwrap())
            .collect();

        dimensions.sort();

        paper_needed +=
            dimensions[0] * dimensions[1] +
            2 * dimensions[0] * dimensions[1] +
            2 * dimensions[1] * dimensions[2] +
            2 * dimensions[2] * dimensions[0];

        ribbon_needed +=
            2 * dimensions[0] + 2 * dimensions[1] +
            dimensions[0] * dimensions[1] * dimensions[2]
    }

    println!("Part 1: {}", paper_needed);
    println!("Part 2: {}", ribbon_needed);
}
