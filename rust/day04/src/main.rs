extern crate crypto;

use crypto::md5::Md5;
use crypto::digest::Digest;

fn main() {
    let secret_key = "yzbqklnj".as_bytes();

    let mut md5 = Md5::new();

    let mut found_five_zeros = false;

    for number in 0.. {
        md5.input(secret_key);
        md5.input(&number.to_string().as_bytes());

        let mut output = [0; 16]; // MD5 hash is 16 bytes
        md5.result(&mut output);

        // Bit shift by 4 gets us first half of the byte (0xXY >> 4) = X
        let first_five = output[0] as i32 + output[1] as i32 + (output[2] >> 4) as i32;
        if first_five == 0 {
            if !found_five_zeros {
                println!("Part 1: {}", number);
                found_five_zeros = true;
            }

            let first_six = output[0] as i32 + output[1] as i32 + output[2] as i32;
            if first_six == 0 {
                println!("Part 2: {}", number);
                break;
            }
        }

        md5.reset();
    }
}
