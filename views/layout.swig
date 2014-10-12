<!DOCTYPE html>
<html ng-app="Dossier">
<head>
  <meta charset="utf8" />
  <title>{% block title %}Dossier{% endblock %}</title>
  <link href="//maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css" rel="stylesheet">
  <link rel="stylesheet" type="text/css" href="styles/app.min.css">
  <script src='scripts/libs.min.js'></script>
  <script src='scripts/app.min.js'></script>
</head>
<body role="application" ng-controller="AppController" ui-view></body>
</html>
