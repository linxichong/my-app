export const callApi = (url: string) => {
    return fetch(url)
        .then(response =>
            response.json().then(json => {
                if (!response.ok) {
                    return Promise.reject(json)
                }

                return json
            })
        )
}