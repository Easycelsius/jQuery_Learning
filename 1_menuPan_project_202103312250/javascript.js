// 페이지 로드 완료 후 실행
$(()=>{

    // 총합값 초기화
    let total = 0;

    // 텍스트 에이리어에 값 넣기
    $("#ta").val(total);

    // 마우스 좌우클릭 구분
    $("#menu_coffee_div>div").mousedown(function(e){
        // alert(e.which); // 1 좌 2 휠 3 우
        // 내용 추출
        let coffee_name = $(this).text().split(":")[0].trim();
        let price = $(this).text().trim().replace(/[^0-9]/g,'');
        let count = 1;

        // 테이블 키값
        coffee_key = "#order_"+coffee_name;

        // 마우스 좌클릭이라면
        if(e.which==1){

            // 삭제이벤트
            deleteEventStarter();

            // 가격알림
            total += Number(price);
            $("#ta").val(priceToString(total));

            if ($(coffee_key).text()=="") {
                // 없는 거면 그냥 추가
                $("#tb").append(
                    "<tr"+" id="+"'order_"+coffee_name+"' price="+price+">"+
                        "<td>"+coffee_name+"</td>"+
                        "<td>"+count+"</td>"+
                        "<td>"+"<button class='delete'>삭제</button>"+"</td>"+
                    "</tr>" 
                )
            } else {
                // 있는 거면 테이블에서 갯수 가져와서 + 1
                let num = Number($("#order_"+coffee_name+">td:eq(1)").text());
                num += 1;
                $(coffee_key+">td:eq(1)").text(num);
            }

        } else if(e.which==3){

            // 가격내림
            total -= Number(price);
            $("#ta").val(priceToString(total));

            if ($(coffee_key).text()=="") {
                // 없는 거면 그냥 추가
                $("#tb").append(
                    "<tr"+" id="+"'order_"+coffee_name+"' price="+price+">"+
                        "<td>"+coffee_name+"</td>"+
                        "<td>"+-1+"</td>"+
                        "<td>"+"<button class='delete'>삭제</button>"+"</td>"+
                    "</tr>" 
                )
            } else {
                // 있는 거 테이블에서 갯수 가져와서 -1
                let num = Number($("#order_"+coffee_name+">td:eq(1)").text());
                num -= 1;
                $(coffee_key+">td:eq(1)").text(num);
            }
        }
    });

    // 주문하기 버튼
    $("#order_btn").click(function(){

        // 총합가격에 따른 분기점
        (total<0) ? alert("환불이 완료되었습니다. ( 환불 : " + total + "원 )") : alert("주문이 완료되었습니다. ( 가격 : " + total + "원 )");
        // 초기화
        backToStartPoint();

    });  

    // 내역 초기화
    function backToStartPoint(){
        // 가격 초기화
        total = 0;
        $("#ta").val(priceToString(total));

        // 내역 초기화
        $("#tb>tr").remove();
    }

    // 천단위로 콤마찍는 정규식
    function priceToString(price) {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    };

    
    
    // 삭제 버튼 클릭시 활동하는 이벤트
    function deleteEventStarter(){
        $(".delete").click(function(){
            let tb_price = $(this).parent().parent().attr("price");
            let tb_amount = $(this).parent().parent().children("td:eq(1)").text();
            total = total - Number(tb_price)*Number(tb_amount);
            console.log(Number(tb_price) + " " + Number(tb_amount));
            $("#ta").val(priceToString(total));
            $(this).parent().parent().remove();
        });
    };

    //퀵메뉴 / 스크롤 내릴시 결제창 따라 내려오게
    $(window).scroll(function(){
        $('#sale_div').css('position', 'relative');
        $('#sale_div').css('top', $(document).scrollTop());
    })

    // 엔터 키 입력
    $(document).keydown(function (key) {
        console.log(key.keyCode);

        //키가 13이면 실행 (엔터는 13)
        if(key.keyCode == 13){
            // 주문하기 클릭
            $("#order_btn").click();
        }

        // 1 입력시
        if(key.keyCode == 49||key.keyCode == 97){
            $(".imgs:eq(0)").rightClick();
        }

        // 스페이스 입력시
        if(key.keyCode == 32){
            // 기본 이벤트막기
            key.preventDefault();
            // 초기화 발동
            backToStartPoint();
            // 상단으로 움직이기
            $(document).scrollTop(0);
        }


    });

    // 우클릭 기본 이벤트 제거
    // $(document).on('contextmenu', function() {
    //     return false;
    // });

    // 마우스 커서 변경
    $('.imgs').css('cursor', 'pointer');
    $('#order_btn').css('cursor', 'pointer');

})