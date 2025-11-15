<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Service Not Found</title>
    </head>
    <body class="antialiased">
    <div style="margin-left: 20px;">
        <h2 style="margin-left: 100px;">From: {{$data->name}}, {{$data->email}}</h2>
        <br>
        <div>Service: {{$data->title}}</div>
        <br>
    </div>
    </body>
</html>
