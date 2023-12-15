import django_filters
from ads.models import Ad


class AdFilter(django_filters.rest_framework.FilterSet):
    title = django_filters.CharFilter(field_name="title", lookup_expr="icontains", )

    # CharFilter — специальный фильтр, который позволяет искать совпадения в текстовых полях модели
    class Meta:
        model = Ad
        fields = ("title",)
