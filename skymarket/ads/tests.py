from rest_framework.test import APITestCase

from users.models import User
from ads.models import Ad, Comment


class AdsTestCase(APITestCase):
    def setUp(self):
        self.user = User.objects.create(email="test@test.test", is_active=True)
        self.user.set_password("test")
        self.user.save()
        self.client.force_authenticate(user=self.user)
        self.ad = Ad.objects.create(
            title="test", price=100, description="test", author=self.user
        )
        self.comment = Comment.objects.create(text="test", author=self.user, ad=self.ad)

    def test_get_ads(self):
        """Проверка получения списка объявлений"""
        response = self.client.get("/api/ads/")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(
            response.json(),
            {
                "count": 1,
                "next": None,
                "previous": None,
                "results": [
                    {
                        "pk": self.ad.id,
                        "title": self.ad.title,
                        "price": self.ad.price,
                        "description": self.ad.description,
                        "image": None,
                    }
                ],
            },
        )

    def test_get_my_ads(self):
        """Проверка получения списка объявлений пользователя"""
        response = self.client.get("/api/ads/me/")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(
            response.json(),
            {
                "count": 1,
                "next": None,
                "previous": None,
                "results": [
                    {
                        "pk": self.ad.id,
                        "title": self.ad.title,
                        "price": self.ad.price,
                        "description": self.ad.description,
                        "image": None,
                    }
                ],
            },
        )

    def test_create_ad(self):
        """Проверка создания объявления"""
        data = {
            "title": "test",
            "price": 100,
            "description": "test",
        }
        response = self.client.post("/api/ads/", data, format="json")
        self.assertEqual(response.status_code, 201)
        self.assertEqual(
            response.json(),
            {
                "title": self.ad.title,
                "price": self.ad.price,
                "description": self.ad.description,
                "image": None,
            },
        )

    def test_update_ad(self):
        """Проверка обновления объявления"""
        data = {
            "title": "test",
            "price": 100,
            "description": "test",
        }
        response = self.client.put(f"/api/ads/{self.ad.id}/", data, format="json")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(
            response.json(),
            {
                "title": self.ad.title,
                "price": self.ad.price,
                "description": self.ad.description,
                "image": None,
            },
        )

    def test_delete_ad(self):
        """Проверка удаления объявления"""
        response = self.client.delete(f"/api/ads/{self.ad.id}/")
        self.assertEqual(response.status_code, 204)

    def test_get_comments(self):
        """Проверка получения списка комментариев"""
        response = self.client.get(f"/api/ads/{self.ad.id}/comments/")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(
            response.json(),
            {
                "count": 1,
                "next": None,
                "previous": None,
                "results": [
                    {
                        "pk": self.comment.id,
                        "text": self.comment.text,
                        "author_id": str(self.comment.author.id),
                        "ad_id": self.comment.ad.id,
                        "created_at": response.json()['results'][0]['created_at'],
                        "author_first_name": self.comment.author.first_name,
                        "author_last_name": self.comment.author.last_name,
                        "author_image": '',
                    }
                ],
            },
        )

    def test_create_comment(self):
        """Проверка создания комментария"""
        data = {
            "text": "test",
        }
        response = self.client.post(f"/api/ads/{self.ad.id}/comments/", data)
        self.assertEqual(response.status_code, 201)
        self.assertEqual(Comment.objects.count(), 2)

    def test_update_comment(self):
        """Проверка обновления комментария"""
        data = {
            "text": "test!",
        }
        response = self.client.put(f"/api/ads/{self.ad.id}/comments/{self.comment.id}/", data)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()['text'], data['text'])

    def test_delete_comment(self):
        """Проверка удаления комментария"""
        response = self.client.delete(f"/api/ads/{self.ad.id}/comments/{self.comment.id}/")
        self.assertEqual(response.status_code, 204)
