from django.db import models

class GuestbookEntry(models.Model):
    quote = models.CharField(max_length=500)
    name = models.CharField(max_length=70)
    posted = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ('posted',)
