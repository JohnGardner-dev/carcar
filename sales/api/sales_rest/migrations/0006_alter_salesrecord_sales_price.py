# Generated by Django 4.0.3 on 2022-10-25 21:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('sales_rest', '0005_alter_salesrecord_customer'),
    ]

    operations = [
        migrations.AlterField(
            model_name='salesrecord',
            name='sales_price',
            field=models.FloatField(),
        ),
    ]
