import http from 'k6/http';
import { sleep, check } from 'k6';

export let options = {
    vus: 100,
    duration: '1m',
};

export default function () {
    // Perform the login request
    let loginRes = http.post('https://reqres.in/api/login', JSON.stringify({
        email: "eve.holt@reqres.in",
        password: "cityslicka"
    }), {
        headers: { 'Content-Type': 'application/json' }
    });

    // Validate login response
    let authToken = loginRes.json('token');
    check(loginRes, {
        'is status 200': (r) => r.status === 200,
        'has token': (r) => authToken !== undefined,
    });

    if (!authToken) {
        return; // Exit if login failed
    }

    // Use the token to fetch user details (Simulate an authenticated API call)
    let userRes = http.get('https://reqres.in/api/users/2', {
        headers: {
            'Authorization': `Bearer ${authToken}`,
            'Content-Type': 'application/json'
        }
    });

    // Validate the authenticated request response
    check(userRes, {
        'User data retrieved successfully': (r) => r.status === 200,
        'User ID is correct': (r) => r.json('data.id') === 2,
    });

    sleep(1);  // Simulates user wait time before next request
}
