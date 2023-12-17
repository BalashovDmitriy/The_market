from rest_framework.permissions import BasePermission

from users.models import UserRoles


class IsOwnerOrStaff(BasePermission):
    def has_object_permission(self, request, view, obj):
        return request.user == obj.author or request.user.role == UserRoles.ADMIN
