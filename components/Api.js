class Api {
    constructor ({ baseUrl, headers }) {
        this._baseUrl = baseUrl;
        this._headers = headers;
    }

    getUserInfo() { //hecho
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'GET',
            headers: this._headers,
        })
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Error: ${res.status}`);
        });
    }

    updateUserInfo(name, about) { 
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name,
                about,
            })
        })
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Error: ${res.status}`);
        });
    }

    updateUserAvatar(avatar) {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: avatar
            })
            
        })
        .then(res => {
            
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Error al cargar avatar: ${res.status}`);
        });
        
        
    }
    
    getInitialCards() { //hecho
        return fetch(`${this._baseUrl}/cards/`, {
            method: 'GET',
            headers: this._headers,
        })
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            console.log('Datos de la API:', cardId);
            return Promise.reject(`Error: ${res.status}`);
        });
        
    }
    
    addCard(name, link) {
        return fetch(`${this._baseUrl}/cards/`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name,
                link,
            })
        })
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Error: ${res.status}`);
        });
    }

    deleteCard(cardId) {
        return fetch(`${this._baseUrl}/cards/${cardId}`, {
            method: 'DELETE',
            headers: this._headers,
        })
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Error: ${res.status}`);
        });
    }

    likeCard(cardId) {
        return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
            method: 'PUT',
            headers: this._headers,
            
        })
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Error: ${res.status}`);
        });
    }
    dislikeCard(cardId) {
        return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
            method: 'DELETE',
            headers: this._headers,
        })
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Error: ${res.status}`);
        });
    }

}
export const apiAcces = new Api ( {
    baseUrl : "https://around-api.es.tripleten-services.com/v1",
    headers : {
        Authorization: "7d6605b4-d435-4af1-8d05-f10a54b28ea3",
        id: "4a1374e06fad7fc5cf6291ae",
        'Content-Type': 'application/json'
      }
   });