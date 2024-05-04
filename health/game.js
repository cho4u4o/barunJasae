function loadGameContent(gameType) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', gameType + '_game.html', true);
  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
      document.getElementById("container").innerHTML = xhr.responseText;
    }
  };
  xhr.send();
}

var $menuEle = $('li'); // 탭메뉴를 변수에 지정
$menuEle.click(function() { // 탭메뉴 클릭 이벤트
    $('li').addClass('hidden');
    $(this).next().removeClass('hidden');
})