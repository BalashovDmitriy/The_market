from rest_framework import serializers

from ads.models import Comment, Ad


class CommentSerializer(serializers.ModelSerializer):
    author_first_name = serializers.CharField(source="author.first_name")
    author_last_name = serializers.CharField(source="author.last_name")
    author_id = serializers.CharField(source="author.id")
    author_image = serializers.CharField(source="author.image")

    class Meta:
        model = Comment
        fields = (
            "pk",
            "text",
            "author_id",
            "created_at",
            "author_first_name",
            "author_last_name",
            "ad_id",
            "author_image",
        )


class CommentCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ("text",)


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
