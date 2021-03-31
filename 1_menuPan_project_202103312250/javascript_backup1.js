// 페이지 로드 완료 후 실행
$(()=>{
    let total = 0;
    $("#ta").val(total);

    $("#menu_coffee_div>div").click(function(){
        // 내용 추출
        let coffee_name = $(this).text().split(":")[0].trim();
        let price = $(this).text().trim().replace(/[^0-9]/g,'');
        let count = 1;

        // 가격알림
        total += Number(price);
        $("#ta").val(priceToString(total));

        // 기존에 주문한 것인지 확인
        coffee_key = $("#order_"+coffee_name).text()=="";
        
        if (coffee_key) {
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
            $("#order_"+coffee_name+">td:eq(1)").text(num);
        }

        // 삭제 이벤트 진행
        deleteEventStarter();
    });

    // 주문하기 버튼
    $("#order_btn").click(function(){
        alert("주문이 완료되었습니다. 가격 : " + total);
        // 가격 초기화
        total = 0;
        $("#ta").val(priceToString(total));
        // 내역 초기화
        $("#tb>tr").remove();
    });

    // 주문총합
    

    // 삭제 버튼
    // $(".delete").click(function(){
    //     alert("안녕");
    //     // console.log($(this));
    //     // $(this).parent().parent().remove()
    // });

    

    $(".delete").on("click", function(){
            alert("안녕");
            // console.log($(this));
            // $(this).parent().parent().remove()
    });

    // 천단위로 콤마찍는 정규식
    function priceToString(price) {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }

    // 삭제 버튼 클릭시 활동하는 이벤트
    function deleteEventStarter(){
        $(".delete").click(function(){
            
            $(this).parent().parent().remove();
        });
    }

})