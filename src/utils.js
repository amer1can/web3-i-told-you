function copyAddress(address) {
    navigator.clipboard.writeText(address)
        .then(() => {
            console.log('Copied: ', address)
        })
        .catch(err => console.log(err))

    const tooltip = document.createElement('div')
    tooltip.classList.add('tp')
    tooltip.innerHTML = 'Copied'
    document.body.appendChild(tooltip)

    setTimeout(()=> {
        tooltip.classList.add('showed')
    },100)

    setTimeout(()=> {
        tooltip.classList.remove('showed')
        setTimeout(()=> {
            tooltip.remove()
        },2100)
    }, 2000)
}

export { copyAddress }
