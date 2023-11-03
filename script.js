const gameContainer = document.querySelector('.container'),
    userResult = document.querySelector('.user_result img'),
    cpuResult = document.querySelector('.cpu_result img'),
    result = document.querySelector('.result'),
    optionImages = document.querySelectorAll('.option_image');

optionImages.forEach((image, index) => {
    image.addEventListener('click', e => {
        image.classList.add('active'); // 클릭된 이미지에 active 클래스 추가

        userResult.src = cpuResult.src = 'images/rock.png'; // userResult 와 cpuResult 를 rock.png 로 설정
        result.textContent = '로딩 중 ...'; // result 의 텍스트를 설정

        optionImages.forEach((image2, index2) => {
            index !== index2 && image2.classList.remove('active'); // 현재 클릭한 이미지를 제외하고 active 클래스를 제거
        });

        gameContainer.classList.add('start'); // gameContainer 에 start 클래스 추가

        let time = setTimeout(() => {
            gameContainer.classList.remove('start'); // gameContainer 에 start 클래스 제거하여 게임 결과를 표시

            // 클릭된 이미지 소스를 가져와 userResult 이미지로 설정
            let imageSrc = e.target.querySelector('img').src;
            userResult.src = imageSrc;

            // 0 1 2 중 랜덤한 숫자를 생성
            // Math.random() : 0 이상 1 미만의 랜덤한 숫자를 생성 ex) 0.1234566
            // Math.floor() : 주어진 숫자를 소주점 이하를 버리고 가장 가까운 정수로 내림
            // Math.random 은 0 이상 1 미만의 숫자를 생성하여 3 으로 곱하면 0 이상 3 미만 숫자가 생성
            let randomNumber = Math.floor(Math.random() * 3);

            // cpuImages 에 들어갈 이미지 소스 배열
            // randomNumber 에서 받은 숫자로 배열의 이미지를 cpuResult 에 설정
            // 0 일때 scissors.png, 1 일때 rock.png, 2 일때 paper.png
            let cpuImages = ['images/scissors.png', 'images/rock.png', 'images/paper.png'];
            cpuResult.src = cpuImages[randomNumber];

            let cpuValue = ['S', 'R', 'P'][randomNumber]; // randomNumber 에서 나온 숫자로 S R P 중 하나를 cpuValue 에 설정
            let userValue = ['S', 'R', 'P'][index]; // 사용자가 클릭한 이미지의 인덱스

            // 게임 결과를 나타냄
            let outcomes = {
                SS: '무승부',
                SR: '패배',
                SP: '승리 !',
                RS: '승리 !',
                RR: '무승부',
                RP: '패배',
                PS: '패배',
                PR: '승리 !',
                PP: '무승부',
            };

            // userValue 와 cpuValue 의 선택을 조합아여 게임의 결과를 표시
            let outComeValue = outcomes[userValue + cpuValue];

            // result 텍스트에 userValue 와 cpuValue 가 같으면 무승부 다르면 outComeValue 의 결과를 가져와 표시
            result.textContent = userValue === cpuValue ? '무승부' : `${outComeValue}`;
        }, 1500); // 1.5초 후에 게임의 결과를 표시
    });
});
