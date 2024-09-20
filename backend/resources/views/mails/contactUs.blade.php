<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Contact Us Form Question</title>
    </head>
    <body class="antialiased">
    <div style="margin-left: 20px;">
        <h2 style="margin-left: 100px;">Subject: {{$data->subject}},</h2>
        <br>
        <div>From:{{$data->first_name}} {{$data->last_name}} Email: {{$data->email}}</div>
        <br>
        <div>Text:</div>
        <br>
        <div>
            {{$data->text}}
                <br><br>
        </div>
    </div>
    </body>
</html>
