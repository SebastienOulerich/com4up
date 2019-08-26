let cards = Array.from(document.querySelectorAll('.card'))

cards.forEach((card) => {
    card.addEventListener('click', function() {
        let flip = new Flip()
        flip.read(cards)
        card.parentNode.removeChild(card)
        cards = cards.filter(c => c !== card)
        flip.play(cards)
    })
})

class Flip {
    constructor() {
        this.duration = 300
        this.positions = {}
    }


    read(elements) {
        elements.forEach(element => {
            const id = element.getAttribute('id')
            this.positions[id] = element.getBoundingClientRect()
        })
    }

    play(elements) {
        elements.forEach(element => {
            const id = element.getAttribute('id')
            const newPosition = element.getBoundingClientRect()
            const oldPosition = this.positions[id]
            const deltaX = oldPosition.x - newPosition.x
            const deltaY = oldPosition.y - newPosition.y
            const deltaW = oldPosition.width / newPosition.width
            const deltaH = oldPosition.height / newPosition.height
            element.animate([{
                transform: `translate(${deltaX}px, ${deltaY}px) scale(${deltaW}, ${deltaH})`
            }, {
                transform: 'none'
            }], {
                duration: this.duration,
                easing: 'ease-in-out',
                fill: 'both'
            })
            element.style.transform = `translate(${deltaX}px, ${deltaY}px) scale(${deltaW}, ${deltaH})`
        })
    }
}