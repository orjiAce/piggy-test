const BASE_URL = 'https://www.themealdb.com/api/json/v1/1/'


export const getCategories = async () => {

    const myHeaders = {
        'Content-Type': 'application/json',
    }
    let timeoutId: NodeJS.Timeout


    const requestOptions = {
        method: 'GET',
        headers: myHeaders,
    };

    return Promise.race([
        fetch(`${BASE_URL}/categories.php`, requestOptions)
            .then(response => response.json()),
        new Promise((resolve, reject) => {
            timeoutId = setTimeout(() => reject(new Error('Timeout')), 20000)

            //  clearTimeout(timeoutId)
        }).then(() => {
            clearTimeout(timeoutId)
        })

    ])

}


export const getCurrentCategory = async (category : string) => {

    const myHeaders = {
        'Content-Type': 'application/json',
    }
    let timeoutId: NodeJS.Timeout


    const requestOptions = {
        method: 'GET',
        headers: myHeaders,
    };

    return Promise.race([
        fetch(`${BASE_URL}/filter.php?c=${category}`, requestOptions)
            .then(response => response.json()),
        new Promise((resolve, reject) => {
            timeoutId = setTimeout(() => reject(new Error('Timeout')), 20000)

            //  clearTimeout(timeoutId)
        }).then(() => {
            clearTimeout(timeoutId)
        })

    ])

}