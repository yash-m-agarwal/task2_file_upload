from django.http import Http404
from django.shortcuts import render, redirect
from django.template import RequestContext
from django.views.decorators.csrf import csrf_protect
from django.views.decorators.csrf import csrf_exempt

from .models import Data, File


def home(request):
    data = Data.objects.all()
    return render(request, 'home.html', {'data': data})


def file_view(request, pk):
    try:
        datum = Data.objects.get(pk=pk)
    except Data.DoesNotExist:
        raise Http404
    return render(request, 'file_view.html', {'datum': datum})


@csrf_exempt
def new_upload(request):

    csrf_context = RequestContext(request)

    if request.method == 'POST' and request.is_ajax():

        print('Inside the POST request')
        title = request.POST.get('title')
        description = request.POST.get('description')
        files = request.FILES.getlist('files[]')

        print(files)

        datum = Data.objects.create(
             title=title,
             description=description,
             file_flagship=files[0],
        )

        for file in files:
            File.objects.create(
                file=file,
                data=datum
            )
        print('hello')
        print(datum.pk)
        return redirect('https://google.com')
    else:
        return render(request, 'new_upload.html')
