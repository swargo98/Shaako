# Generated by Django 4.0.2 on 2022-07-28 05:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Organization', '0008_lesson_lesson_chw_remove_content_supervisor_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='lesson',
            name='content',
            field=models.CharField(max_length=100000),
        ),
    ]
