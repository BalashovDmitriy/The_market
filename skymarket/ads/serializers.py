from rest_framework import serializers

from ads.models import Comment, Ad


class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = "__all__"


class AdSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ad
        fields = ("pk", "image", "title", "price", "description")


class AdCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ad
        fields = ("image", "title", "price", "description")


class AdDetailSerializer(serializers.ModelSerializer):
    phone = serializers.CharField(source="author.phone")
    author_first_name = serializers.CharField(source="author.first_name")
    author_last_name = serializers.CharField(source="author.last_name")
    author_id = serializers.CharField(source="author.id")

    class Meta:
        model = Ad
        fields = (
            "pk",
            "image",
            "title",
            "price",
            "phone",
            "description",
            "author_first_name",
            "author_last_name",
            "author_id",
        )
