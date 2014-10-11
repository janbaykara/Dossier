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
<body role="application" ng-controller="AppController">

  <header class="app__header bg-brand" role="banner">
    <div class="app__content">
      <span class="em4 bold black app__header__title">Dossier</span>
      <nav class="h-li app__nav" role="menubar">
        <!-- <a class="h-li__item silent" sref="/create">/create</a> -->
        <!-- <a class="h-li__item silent" sref="/logout">/logout</a> -->
        <!-- <a class="h-li__item silent" sref="/settings">/settings</a> -->
      </nav>
    </div>
  </header>

  <div class="app__content" ui-view></div>

  <footer class="app__footer">
    <div class="app__content">
        <span class="em_8 silver">Created by <a class="inherit bold" href="http://github.com/JanBaykara"><i class="fa fa-github-square"></i> Jan Baykara</a></span>
    </div>
  </footer>

</body>
</html>
