from djoser.serializers import UserCreateSerializer as BaseUserRegistrationSerializer
from rest_framework import serializers
from django.contrib.auth import get_user_model

User = get_user_model()


class UserRegistrationSerializer(BaseUserRegistrationSerializer):
    class Meta:
        model = User
        fields = ('email', 'first_name', 'last_name', 'password', 'phone', 'image')


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('first_name', 'last_name', 'phone', 'id', 'email', 'image')


class UserListSerializer(serializers.ModelSerializer):
    count = serializers.SerializerMethodField()
    results = serializers.SerializerMethodField()

    def get_results(self, obj):
        if obj.role == 'user':
            queryset = User.objects.filter(role='user')
            return UserSerializer(queryset, many=True).data
        elif obj.role == 'admin':
            queryset = User.objects.all()
            return UserSerializer(queryset, many=True).data

    def get_count(self, obj):
        if obj.role == 'user':
            return User.objects.filter(role='user').count()
        elif obj.role == 'admin':
            return User.objects.all.count()

    class Meta:
        model = User
        fields = ('count', 'results')


class CurrentUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('first_name', 'last_name', 'phone', 'id', 'email', 'image')
