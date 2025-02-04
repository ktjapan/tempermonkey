// ==UserScript==
// @name         Multi-Text Replacement Script with Additional Translation
// @namespace    http://tampermonkey.net/
// @version      1.6
// @description  Replace multiple words and sentences dynamically on a webpage, including "를 클릭해주세요"
// @author       Your Name
// @match        *://*/*
// @grant        none
// @updateURL    https://raw.githubusercontent.com/ktjapan/tempermonkey/refs/heads/main/Multi-Text%20Replacement%20Script%20with%20Additional%20Translation.js
// @downloadURL  https://raw.githubusercontent.com/ktjapan/tempermonkey/refs/heads/main/Multi-Text%20Replacement%20Script%20with%20Additional%20Translation.js
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
        { from: /회원님은 지난 3개월 동안 비밀번호를 변경하지 않은 상태입니다/g, to: '会員様は過去3ヶ月間、パスワードを変更していない状態です' },
        { from: /비밀번호는 3개월 마다 변경하는 것을 권장해드립니다/g, to: 'パスワードは3ヶ月ごとに変更することを推奨します' },
        { from: /새로운 비밀번호로 계정을 안전하게 관리해주세요/g, to: '新しいパスワードでアカウントを安全に管理してください' },
        { from: /비밀번호 변경하기/g, to: 'パスワードを変更する' },
        { from: /다음에 변경하기/g, to: '次回に変更する' },
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