from django.db import models

class Data(models.Model):
    title = models.CharField(max_length=100, null=False)
    description = models.CharField(max_length=1000, null=False)
    file_flagship = models.FileField(upload_to='file/')
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title


class File(models.Model):
    file = models.FileField(upload_to='file/')
    data = models.ForeignKey(Data, related_name='files', null=True)
