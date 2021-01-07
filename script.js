
class ViginereCypher {
    constructor() {
        this.letters = ['a', 'b', 'c', 'd', 'e', 'f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']//,'1','2','3','4','5','6','7','8','9','0']

        this.key_selector = '.key input'
    }

    encrypt(text, textarea=1, decrypt=false) {
        const key = document.querySelector(this.key_selector).value

        let encrypted_msg = ''

        const key_extended = this.extend_key(key, text.length)

        let i=0

        const letter_duplicated = [...this.letters, ...this.letters]

        while (encrypted_msg.length < text.length) {
            const text_letters_index = this.letters.indexOf(text[i])
            const key_letters_index = this.letters.indexOf(key_extended[i])

            console.log(text_letters_index, key_letters_index)

            if (!decrypt) {
                encrypted_msg += letter_duplicated[text_letters_index + key_letters_index]
                console.log(text_letters_index - key_letters_index )
            } else {
                console.log(text_letters_index - key_letters_index )
                const index = text_letters_index - key_letters_index

                if (index < 0) {
                    encrypted_msg += letter_duplicated[letter_duplicated.length - Math.abs(index)]
                } else {
                    encrypted_msg += letter_duplicated[index]
                }
            }

            i++
        }

        const encrypedt_input = document.querySelectorAll('textarea')[textarea]

        encrypedt_input.value = encrypted_msg

        
    }

    decrypt(text) { // The way you encrypt is very similar to decrypt then i made the encrypt function decrypt too
        this.encrypt(text, 0, true)
    }

    key_changed() {
        const msg = document.querySelectorAll('textarea')[0].value
        this.encrypt(msg)
    }

    extend_key(key, length) { // This function is to extend the size of key to the size of the message by repeating the characters

        const repeat_ceil = Math.ceil(length / key.length)

        let key_extended = key.repeat(repeat_ceil)

        const percent_to_cut = (repeat_ceil - (length / key.length)) / repeat_ceil

        const amount_to_cut = percent_to_cut * key_extended.length

        key_extended = key_extended.slice(0, key_extended.length-amount_to_cut)

        return key_extended
        
        
    }
}

const viginere = new ViginereCypher()