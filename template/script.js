//  configuraciones de facebook

document.getElementById = ('loginbtn').addEventListener('click', loginWithFacebook, false);

function loginWithFacebook() {

    FB.login(response => {
        const { authResponse: { accessToken, userId } } = response
        fetch('/login-with-facebook', {
            method: 'POST',
            headers: {
                'Content-type': 'application / json '
            },
            body: JSON.stringify({ accessToken, userId })
        }).then(res => {
            console.log(res)
        })
        FB.api('/me', function(response) {
            console.log(JSON.stringify(response));
        });

    }, { scope: 'public_profile,email' })
    return false
}