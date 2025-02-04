// ==UserScript==
// @name         Multi-Text Replacement Script with Additional Translation
// @namespace    http://tampermonkey.net/
// @version      1.6
// @description  Replace multiple words and sentences dynamically on a webpage, including "를 클릭해주세요"
// @author       Your Name
// @match        *://*/*
// @grant        none
// @updateURL    https://raw.githubusercontent.com/ktjapan/tempermonkey/refs/heads/main/Multi-Text%20Replacement%20Script%20with%20Additional%20Translation.js?timestamp=1707072000
// @downloadURL  https://raw.githubusercontent.com/ktjapan/tempermonkey/refs/heads/main/Multi-Text%20Replacement%20Script%20with%20Additional%20Translation.js?timestamp=1707072000
// ==/UserScript==

(function () {
    'use strict';

    // 텍스트 변환 규칙 정의
    const replacements = [
        //로그인 페이지 'https://cloud.kt.com/portal/login/'
        { from: /로그인/g, to: 'ログイン' },
        { from: /kt cloud 에 오신 것을 환영합니다/g, to: 'kt cloudにようこそ' },
        { from: /아이디 저장/g, to: 'ID保存' },
        { from: /안전한 ログイン을 위해 2차\(OTP\) 인증 기능 사용을 적극 권고 드립니다/g, to: '安全なログインのために2次(OTP)認証機能の使用を積極的に推奨します' },
        { from: /2차\(OTP\) 인증 설정 방법 안내는/g, to: '2次(OTP)認証設定方法の案内は' },
        { from: /여기/g, to: 'こちら' },
        { from: /를 클릭해주세요/g, to: 'クリックしてください' },
        { from: /회원가입/g, to: '会員登録' },
        { from: /아이디 찾기/g, to: 'ID検索' },
        { from: /비밀번호 찾기/g, to: 'パスワード検索' },
        { from: /계정 잠금 해제/g, to: 'アカウントロック解除' },
        { from: /Root 사용자/g, to: 'Root ユーザー' },
        { from: /IAM 사용자/g, to: 'IAM ユーザー' },
        { from: /잘못 입력된 Captcha Code 입니다/g, to: 'Captcha コードが間違っています。' },
        { from: /잘못 입력한 ID 또는 Password 입니다/g, to: 'ID または Passwordが間違っています。' },
        //비밀번호 변경 안내 페이지 'https://cloud.kt.com/portal/login/change-password?platform=g'
        { from: /비밀번호 변경 안내/g, to: 'パスワード変更の案内' },
        { from: /회원님은 지난 3개월 동안 비밀번호를 변경하지 않은 상태입니다/g, to: '会員様は過去3ヶ月間、パスワードを変更していない状態です。' },
        { from: /비밀번호는 3개월 마다 변경하는 것을 권장해드립니다/g, to: 'パスワードは3ヶ月ごとに変更することを推奨します。' },
        { from: /새로운 비밀번호로 계정을 안전하게 관리해주세요/g, to: '新しいパスワードでアカウントを安全に管理してください。' },
        { from: /비밀번호 변경하기/g, to: 'パスワードを変更する' },
        { from: /다음에 변경하기/g, to: '次回に変更する' },
         //홈 화면
        { from: /매뉴얼/g, to: 'マニュアル' },
        { from: /온라인문의/g, to: 'オンライン問い合わせ' },
        { from: /전체 자원/g, to: '全体リソース' },
        { from: /이번 달 요금/g, to: '今月の料金' },
        { from: /부가세 별도/g, to: '消費税別途' },
        { from: /데이터부족/g, to: 'データ不足' },
        { from: /최근 알림/g, to: '最近の通知' },
        { from: /공지/g, to: 'お知らせ' },
        { from: /가상 서버/g, to: '仮想サーバー' },
        //All Services https://cloud.kt.com/console/g/allservice
        { from: /콘솔의 서비스를 관리하고 원하는 페이지로 이동합니다./g, to: 'コンソールのサービスを管理し、希望のページに移動します。' },
        { from: /서비스 신청/g, to: 'サービス申請' },
        { from: /서비스 해지/g, to: 'サービス解約' },
        { from: /청약일/g, to: '申込日' },
        { from: /기업/g, to: '企業' },
        { from: /클린존/g, to: 'クリーンゾーン' },
        { from: /신청하기/g, to: '申請する' },
        { from: /사용할 서비스를 신청합니다./g, to: '使用するサービスを申請します。' },
        //server https://cloud.kt.com/console/g/serverlist
        { from: /가상 서버를 관리합니다./g, to: '仮想サーバーを管理します。' },
        { from: /생성시작/g, to: '作成開始' },
        { from: /재시작/g, to: '再起動' },
        { from: /강제정지/g, to: '強制停止' },
        { from: /접속설정/g, to: '接続設定' },
        { from: /모든 상태/g, to: 'すべての状態' },
        //서버 생성
        { from: /서버 이름/g, to: 'サーバー名' },
        { from: /서버명과 같은 hostname을 사용합니다./g, to: 'サーバー名と同じホスト名を使用します。' },
        { from: /월요금제/g, to: '月額料金プラン' },
        { from: /시간요금제/g, to: '時間料金プラン' },
        { from: /1년 약정 요금제/g, to: '1年契約料金プラン' },
        { from: /2년 약정 요금제/g, to: '2年契約料金プラン' },
        { from: /3년 약정 요금제/g, to: '3年契約料金プラン' },
        { from: /운영체제 및 소프트웨어/g, to: 'OSおよびソフトウェア' },
        { from: /고급 설정/g, to: '詳細設定' },
        { from: /만들 서버 수/g, to: '作成するサーバー数' },
        { from: /분산배치/g, to: '分散配置' },
        { from: /VM이 생성된 이후 OS에서 자동으로 실행할 스크립트를 설정할 수 있습니다./g, to: 'VMが作成された後、OSで自動実行するスクリプトを設定できます。' },
        { from: /VM생성시 비밀번호 접속방식이 아닌 암호화된 SSH Keypair 파일로 접속합니다./g, to: 'VM作成時、パスワード接続方式ではなく、暗号化されたSSH Keypairファイルで接続します。' },
        { from: /VM 생성시 지정한 내부IP로 생성합니다./g, to: 'VM作成時に指定した内部IPで作成します。' },
        { from: /VM에 Multi-NIC을 제공하여 VM 간에 내부통신할 수 있습니다./g, to: 'VMにMulti-NICを提供し、VM間で内部通信が可能です。' },
        { from: /선택된 가상 서버와 다른 물리 장비에 생성됩니다. 사용 중인 가상 서버만 선택할 수 있습니다./g, to: '選択された仮想サーバーとは異なる物理機器に作成されます。使用中の仮想サーバーのみ選択可能です。' },
        { from: /생성할 서버에 그룹을 설정합니다./g, to: '作成するサーバーにグループを設定します。' },
        { from: /추가 데이터 볼륨을 설정합니다./g, to: '追加データボリュームを設定します。' },
        //common
        { from: /원/g, to: 'ウォン' },
        { from: /월/g, to: '月' },
        { from: /지정/g, to: '指定' },
        { from: /별도/g, to: '別途' },
        { from: /취소/g, to: 'キャンセル' },
        { from: /정지/g, to: '停止' },
        { from: /사용/g, to: '使用' },
        { from: /발생/g, to: '発生' },
        { from: /안정/g, to: '安定' },
        { from: /서버/g, to: 'サーバー' },
        { from: /삭제/g, to: '削除' },
        { from: /이름/g, to: '名前' },
        { from: /상태/g, to: '状態' },
        { from: /위치/g, to: '位置' },
        { from: /운영체제/g, to: 'OS' },
        { from: /사양/g, to: '仕様' },
        { from: /사설IP/g, to: 'プライベートIP' },
        { from: /추가 사설IP/g, to: '追加プライベートIP' },
        { from: /생성일시/g, to: '作成日時' },
        { from: /옵션/g, to: 'オプション' },
        { from: /그룹/g, to: 'グループ' },
        { from: /설정/g, to: '設定' },
        { from: /가이드/g, to: 'ガイド' },
    ];

    // 텍스트 변환 함수
    function replaceText(node) {
        if (node.nodeType === Node.TEXT_NODE) {
            replacements.forEach(rule => {
                if (node.textContent.match(rule.from)) {
                    node.textContent = node.textContent.replace(rule.from, rule.to);
                }
            });
        }
    }

    // 전체 DOM에서 텍스트를 변환
    function replaceAllText() {
        document.body.querySelectorAll('*').forEach(element => {
            Array.from(element.childNodes).forEach(replaceText);
        });
    }

    // MutationObserver로 DOM 변경 감지
    const observer = new MutationObserver(() => {
        replaceAllText(); // DOM 변경 시마다 텍스트 변환
    });

    // DOM 변화를 감지하고 텍스트를 변환
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });

    // 초기 로드 시 텍스트 변환
    replaceAllText();
})();