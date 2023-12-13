from django.contrib.auth.models import AbstractBaseUser, AbstractUser
from django.db import models
from phonenumber_field.modelfields import PhoneNumberField
from django.utils.translation import gettext_lazy as _

from users.managers import UserManager


class UserRoles:
    ADMIN = "admin"
    USER = "user"


choices = (
    (UserRoles.ADMIN, "Admin"),
    (UserRoles.USER, "User"),
)


class User(AbstractBaseUser):
    first_name = models.CharField(verbose_name=_("first name"), max_length=50)
    last_name = models.CharField(verbose_name=_("last name"), max_length=50)
    phone = PhoneNumberField(verbose_name=_("phone number"), unique=True)
    email = models.EmailField(verbose_name=_("email address"), unique=True)
    image = models.ImageField(verbose_name=_("profile image"), upload_to="profile_images")
    role = models.CharField(verbose_name=_("user role"), max_length=5, choices=choices)

    objects = UserManager()
    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["first_name", "last_name", "phone", "role"]

    @property
    def is_admin(self):
        return self.role == UserRoles.ADMIN

    @property
    def is_user(self):
        return self.role == UserRoles.USER

    @property
    def is_superuser(self):
        return self.is_admin

    @property
    def is_staff(self):
        return self.is_admin

    def has_perm(self, perm, obj=None):
        return self.is_admin

    def has_module_perms(self, app_label):
        return self.is_admin
