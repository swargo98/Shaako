# Generated by Django 4.0.2 on 2022-07-28 03:10

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('Organization', '0006_chw_recruitment_date'),
    ]

    operations = [
        migrations.CreateModel(
            name='Content',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=100)),
                ('content', models.CharField(max_length=2000)),
                ('upload_date', models.DateTimeField()),
                ('supervisor', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='Organization.supervisor')),
            ],
        ),
        migrations.CreateModel(
            name='Content_CHW',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('is_read', models.BooleanField(default=False)),
                ('dateOfRead', models.DateTimeField()),
                ('chw', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='Organization.chw')),
                ('content', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='Organization.content')),
            ],
        ),
        migrations.RemoveField(
            model_name='lesson',
            name='supervisor',
        ),
        migrations.DeleteModel(
            name='Lesson_CHW',
        ),
        migrations.AlterField(
            model_name='quiz',
            name='relatedLesson',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='Organization.content'),
        ),
        migrations.DeleteModel(
            name='Lesson',
        ),
    ]
