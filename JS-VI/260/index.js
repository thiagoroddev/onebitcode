function teste (tempo) {
    return new Promise ((resolve) => {
        setTimeout(()=> {
            resolve()
        }, tempo * 1000)
    })
}