# Generated by Django 5.1.1 on 2024-09-26 23:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0002_remove_user_name_alter_user_status'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='status',
            field=models.BooleanField(blank=True, default=True, null=True),
        ),
    ]
