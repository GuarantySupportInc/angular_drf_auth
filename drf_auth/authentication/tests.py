from django.test import TestCase
from django.contrib.auth.models import User

from rest_framework.test import APIClient

from .views import logged_in_check

import json

class AuthenticationTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.testpass = 'password1234'
        self.testuser = User.objects.create_user(username='admin', password=self.testpass)
        self.testtoken = self.get_token()

    def get_token(self):
        userinfo = {
            'username': self.testuser.username,
            'password': self.testpass,
        }
        response = self.client.post('/rest-auth/login/', userinfo, format='json')
        token = json.loads(response.content)['token']
        return token

    def test_must_be_logged_in_to_view_logged_in_check(self):
        unauthenticated_response = self.client.post('/logged_in_check/')
        resp = json.loads(unauthenticated_response.content)

        expected = 'Authentication credentials were not provided.'
        self.assertEqual(resp['detail'], expected)

        self.client.credentials(HTTP_AUTHORIZATION='JWT ' + self.testtoken)
        authenticated_response = self.client.get('/logged_in_check/')
        resp = json.loads(authenticated_response.content)
        
        expected = 'request was permitted'
        self.assertEqual(resp['status'], expected)
