# Generated by Django 4.0.2 on 2022-08-01 11:42

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('Organization', '0009_alter_lesson_content'),
    ]

    operations = [
        migrations.AddField(
            model_name='quiz',
            name='supervisor',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='Organization.supervisor'),
        ),
    ]
