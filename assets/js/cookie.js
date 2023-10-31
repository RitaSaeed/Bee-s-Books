        const existingIdTokenCookie = document.cookie.split('; ').find(cookie => cookie.startsWith('id_token='));
        const params = window.location.hash.substring(1).split('&');

        let idToken = null;

        for (const param of params) {
        if (param.startsWith('id_token=')) {
            idToken = param.split('=')[1];
        }
        }

        if (idToken && !existingIdTokenCookie) {
            const secureFlag = "secure";
            document.cookie = `id_token=${idToken}; ${secureFlag}; path=/`;
            window.location.replace(window.location.pathname);
        }