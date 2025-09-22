<!DOCTYPE html>
<html lang="pl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Plan Zajęć - Logowanie</title>
    
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
    <style>
        :root{--bg-color:#f0f2f5;--text-color:#212529;--card-bg-color:#ffffff;--muted-text-color:#6c757d;--border-color:rgba(0, 0, 0, 0.05);--header-bg:#583c87;--header-text:#ffffff;--class-day-bg:rgba(244, 212, 220, 0.7);--class-location-text:#b33e5c;--weekend-bg:#f8f9fa;--shadow-color:rgba(0, 0, 0, 0.05);--hover-shadow-color:rgba(0, 0, 0, 0.1);--strong-color:#583c87;--info-color:#0dcaf0;--completed-bg:rgba(204, 240, 214, 0.9);--empty-bg:rgba(255, 226, 183, 0.9);}
        body.dark-mode{--bg-color:#121212;--text-color:#f1f1f1;--card-bg-color:#1e1e1e;--muted-text-color:#909090;--border-color:rgba(255, 255, 255, 0.1);--header-bg:#6a5acd;--class-day-bg:rgba(220, 150, 165, 0.2);--class-location-text:#f48fb1;--weekend-bg:#191919;--shadow-color:rgba(0, 0, 0, 0.2);--hover-shadow-color:rgba(0, 0, 0, 0.3);--strong-color:#9575cd;--info-color:#64d8f0;--completed-bg:rgba(30, 80, 45, 0.7);--empty-bg:rgba(120, 80, 20, 0.6);}
        body{background-color:var(--bg-color);color:var(--text-color);font-family:'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;transition:background-color 0.3s, color 0.3s;}
        .container{max-width:1200px;}
        #login-container{display:flex;align-items:center;justify-content:center;min-height:100vh;}
        .login-box{background:var(--card-bg-color);padding:40px;border-radius:12px;box-shadow:0 0.75rem 1.5rem var(--shadow-color);width:100%;max-width:400px;text-align:center;}
        .login-box .text-muted{color:var(--muted-text-color) !important;}
        #content-container{display:none;}
        .calendar-grid{border-radius:10px;overflow:hidden;box-shadow:0 0.75rem 1.5rem var(--shadow-color);}
        .calendar-day{min-height:140px;display:flex;flex-direction:column;padding:10px;border:1px solid var(--border-color);transition:transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;background-color:var(--card-bg-color);position:relative;}
        .calendar-day:hover{transform:translateY(-5px);box-shadow:0 1rem 2rem var(--hover-shadow-color);z-index:10;}
        .day-header{font-size:0.85rem;font-weight:600;color:var(--header-text);text-transform:uppercase;padding:10px 0;background-color:var(--header-bg);border-bottom:1px solid var(--border-color);}
        .class-day{background-color:var(--class-day-bg);}
        .weekend{background-color:var(--weekend-bg);}
        .day-number{font-size:1.3rem;font-weight:700;color:var(--text-color);margin-bottom:5px;}
        .class-details{margin-top:auto;}
        .lesson{padding:4px 6px;border-radius:4px;margin-bottom:3px;cursor:pointer;transition:background-color 0.3s;border:1px solid rgba(0,0,0,0.05);}
        body.dark-mode .lesson{border:1px solid rgba(255,255,255,0.1);}
        .lesson.completed{background-color:var(--completed-bg);}
        .lesson.empty{background-color:var(--empty-bg);}
        .lesson:not(.editable){cursor:default;}
        .class-location{font-size:0.75rem;color:var(--class-location-text);font-weight:500;margin-top:5px;}
        .card-info, .modal-content{background-color:var(--card-bg-color);border:none;border-radius:10px;box-shadow:0 0.25rem 0.75rem var(--shadow-color);}
        body.dark-mode .card-body, body.dark-mode .card-body .card-text{color:var(--text-color) !important;}
        .card-header-custom{background-color:var(--header-bg);color:var(--header-text);font-weight:600;border-bottom:none;border-top-left-radius:10px;border-top-right-radius:10px;}
        .list-group-item{background-color:transparent;border-color:var(--border-color);color:var(--text-color);}
        .list-group-item strong{color:var(--strong-color);}
        .instruction-icon{font-size:1.5rem;vertical-align:middle;}
        h1, h3, h5, h6{color:var(--strong-color);}
        .lead{color:var(--muted-text-color) !important;}
        .text-info{color:var(--info-color) !important;}
        .btn-close{filter:var(--bg-color) == '#121212' ? invert(1) : none;}
        .theme-switch-wrapper{display:flex;align-items:center;}
        .form-switch .form-check-input{width:3.5em;height:1.75em;cursor:pointer;}
        .form-switch .form-check-input:focus{border-color:rgba(106, 90, 205, 0.4);box-shadow:0 0 0 0.25rem rgba(106, 90, 205, 0.25);}
        .form-switch .form-check-input:checked{background-color:#6a5acd;border-color:#6a5acd;}
        .mobile-day-name{display:none;}
        @media (max-width: 767px){.mobile-day-name{display:block;position:absolute;top:5px;right:8px;font-size:0.7rem;font-weight:bold;color:var(--muted-text-color);opacity:0.7;}}
    </style>
</head>
<body>

    <div id="login-container">
        <div class="login-box">
            <h3 class="mb-4">Plan Zajęć</h3>
            <p class="text-muted mb-4">Podaj dane, aby kontynuować</p>
            <form id="login-form">
                <div class="form-floating mb-3">
                    <input type="email" class="form-control" id="email" placeholder="Email" value="user@example.com" required>
                    <label for="email">Email</label>
                </div>
                <div class="form-floating mb-3">
                    <input type="password" class="form-control" id="password" placeholder="Hasło" required>
                    <label for="password">Hasło</label>
                </div>
                <button type="submit" class="btn btn-primary w-100 py-2" style="background-color: #583c87; border-color: #583c87;">Zaloguj</button>
                <div id="error-message" class="text-danger mt-3" style="display: none;">Błędne dane!</div>
            </form>
        </div>
    </div>

    <div id="content-container" class="container my-5">
        <div class="d-flex justify-content-between align-items-center mb-5 flex-wrap gap-3">
             <div class="text-start">
                <h1 class="display-4 fw-bold">Twój Plan Zajęć</h1>
                <p class="lead mb-0">Wrzesień 2025 - Giganci Programowania (Sulejówek)</p>
            </div>
            <div class="d-flex align-items-center gap-2">
                 <div id="user-panel" class="d-none">
                    <button id="notifications-button" class="btn btn-outline-secondary" title="Włącz powiadomienia"><i class="bi bi-bell"></i></button>
                </div>
                <button id="add-to-homescreen" class="btn btn-outline-secondary" title="Dodaj skrót na pulpicie"><i class="bi bi-phone"></i></button>
                <div class="theme-switch-wrapper form-check form-switch p-0 m-0">
                    <input class="form-check-input m-0" type="checkbox" id="theme-switch" title="Zmień motyw">
                </div>
                <button id="logout-button" class="btn btn-danger" title="Wyloguj"><i class="bi bi-box-arrow-right"></i></button>
            </div>
        </div>
        
        <div id="admin-panel" class="d-none text-center mb-4">
            <button id="send-notification-btn" class="btn btn-info">Wyślij powiadomienie o zakończeniu zajęć</button>
        </div>

        <div class="card mb-5 shadow-sm card-info">
            <div class="card-body">
                <h5><i class="bi bi-controller me-2"></i> Kurs: Podstawy tworzenia gier (z elementami AI)</h5>
                <p class="card-text mb-0"><i class="bi bi-building me-2 text-info"></i> <strong>Organizator:</strong> Giganci Programowania</p>
            </div>
        </div>
        
        <div class="card mb-5 shadow-sm card-info">
             <div class="card-body row text-center">
                <div class="col-6">
                    <h6>Zaliczone lekcje</h6>
                    <p id="lessons-summary" class="fs-4 fw-bold mb-0">0</p>
                </div>
                <div class="col-6">
                    <h6>Zarobiona kwota</h6>
                    <p id="earnings-summary" class="fs-4 fw-bold mb-0">0 zł</p>
                </div>
             </div>
        </div>

        <div class="calendar-grid">
            <div class="d-none d-md-flex row text-center day-header g-0"><div class="col py-2">PONIEDZIAŁEK</div><div class="col py-2">WTOREK</div><div class="col py-2">ŚRODA</div><div class="col py-2">CZWARTEK</div><div class="col py-2">PIĄTEK</div><div class="col py-2">SOBOTA</div><div class="col py-2">NIEDZIELA</div></div>
            <div class="row g-0"><div class="col-12 col-md calendar-day weekend"><span class="mobile-day-name">PN</span><span class="day-number">1</span></div><div class="col-12 col-md calendar-day weekend"><span class="mobile-day-name">WT</span><span class="day-number">2</span></div><div class="col-12 col-md calendar-day weekend"><span class="mobile-day-name">ŚR</span><span class="day-number">3</span></div><div class="col-12 col-md calendar-day class-day"><span class="mobile-day-name">CZ</span><span class="day-number">4</span><div class="class-details"><div class="lesson" data-id="d4-1">16:40-18:15</div><div class="lesson" data-id="d4-2">18:25-20:00</div><div class="class-location"><i class="bi bi-geo-alt-fill"></i> ul. Staszica 3A</div></div></div><div class="col-12 col-md calendar-day class-day"><span class="mobile-day-name">PT</span><span class="day-number">5</span><div class="class-details"><div class="lesson" data-id="d5-1">16:40-18:15</div><div class="lesson" data-id="d5-2">18:25-20:00</div><div class="class-location"><i class="bi bi-geo-alt-fill"></i> ul. Staszica 3A</div></div></div><div class="col-12 col-md calendar-day class-day"><span class="mobile-day-name">SO</span><span class="day-number">6</span><div class="class-details"><div class="lesson" data-id="d6-1">10:00-11:35</div><div class="lesson" data-id="d6-2">11:45-13:20</div><div class="lesson" data-id="d6-3">13:30-15:05</div><div class="class-location"><i class="bi bi-geo-alt-fill"></i> ul. Drobiarska 56</div></div></div><div class="col-12 col-md calendar-day weekend"><span class="mobile-day-name">ND</span><span class="day-number">7</span><div class="class-details"><div class="class-times text-muted">Wolne</div></div></div></div>
            <div class="row g-0"><div class="col-12 col-md calendar-day class-day"><span class="mobile-day-name">PN</span><span class="day-number">8</span><div class="class-details"><div class="lesson" data-id="d8-1">16:40-18:15</div><div class="class-location"><i class="bi bi-geo-alt-fill"></i> ul. Drobiarska 56</div></div></div><div class="col-12 col-md calendar-day class-day"><span class="mobile-day-name">WT</span><span class="day-number">9</span><div class="class-details"><div class="lesson" data-id="d9-1">16:40-18:15</div><div class="lesson" data-id="d9-2">18:25-20:00</div><div class="class-location"><i class="bi bi-geo-alt-fill"></i> ul. Drobiarska 56</div></div></div><div class="col-12 col-md calendar-day class-day"><span class="mobile-day-name">ŚR</span><span class="day-number">10</span><div class="class-details"><div class="lesson" data-id="d10-1">16:40-18:15</div><div class="lesson" data-id="d10-2">18:15-19:50</div><div class="class-location"><i class="bi bi-geo-alt-fill"></i> ul. Staszica 3A</div></div></div><div class="col-12 col-md calendar-day class-day"><span class="mobile-day-name">CZ</span><span class="day-number">11</span><div class="class-details"><div class="lesson" data-id="d11-1">16:40-18:15</div><div class="lesson" data-id="d11-2">18:25-20:00</div><div class="class-location"><i class="bi bi-geo-alt-fill"></i> ul. Staszica 3A</div></div></div><div class="col-12 col-md calendar-day class-day"><span class="mobile-day-name">PT</span><span class="day-number">12</span><div class="class-details"><div class="lesson" data-id="d12-1">16:40-18:15</div><div class="lesson" data-id="d12-2">18:25-20:00</div><div class="class-location"><i class="bi bi-geo-alt-fill"></i> ul. Staszica 3A</div></div></div><div class="col-12 col-md calendar-day class-day"><span class="mobile-day-name">SO</span><span class="day-number">13</span><div class="class-details"><div class="lesson" data-id="d13-1">10:00-11:35</div><div class="lesson" data-id="d13-2">11:45-13:20</div><div class="lesson" data-id="d13-3">13:30-15:05</div><div class="class-location"><i class="bi bi-geo-alt-fill"></i> ul. Drobiarska 56</div></div></div><div class="col-12 col-md calendar-day weekend"><span class="mobile-day-name">ND</span><span class="day-number">14</span><div class="class-details"><div class="class-times text-muted">Wolne</div></div></div></div>
            <div class="row g-0"><div class="col-12 col-md calendar-day class-day"><span class="mobile-day-name">PN</span><span class="day-number">15</span><div class="class-details"><div class="lesson" data-id="d15-1">16:40-18:15</div><div class="class-location"><i class="bi bi-geo-alt-fill"></i> ul. Drobiarska 56</div></div></div><div class="col-12 col-md calendar-day class-day"><span class="mobile-day-name">WT</span><span class="day-number">16</span><div class="class-details"><div class="lesson" data-id="d16-1">16:40-18:15</div><div class="lesson" data-id="d16-2">18:25-20:00</div><div class="class-location"><i class="bi bi-geo-alt-fill"></i> ul. Drobiarska 56</div></div></div><div class="col-12 col-md calendar-day class-day"><span class="mobile-day-name">ŚR</span><span class="day-number">17</span><div class="class-details"><div class="lesson" data-id="d17-1">16:40-18:15</div><div class="lesson" data-id="d17-2">18:15-19:50</div><div class="class-location"><i class="bi bi-geo-alt-fill"></i> ul. Staszica 3A</div></div></div><div class="col-12 col-md calendar-day class-day"><span class="mobile-day-name">CZ</span><span class="day-number">18</span><div class="class-details"><div class="lesson" data-id="d18-1">16:40-18:15</div><div class="lesson" data-id="d18-2">18:25-20:00</div><div class="class-location"><i class="bi bi-geo-alt-fill"></i> ul. Staszica 3A</div></div></div><div class="col-12 col-md calendar-day class-day"><span class="mobile-day-name">PT</span><span class="day-number">19</span><div class="class-details"><div class="lesson" data-id="d19-1">16:40-18:15</div><div class="lesson" data-id="d19-2">18:25-20:00</div><div class="class-location"><i class="bi bi-geo-alt-fill"></i> ul. Staszica 3A</div></div></div><div class="col-12 col-md calendar-day class-day"><span class="mobile-day-name">SO</span><span class="day-number">20</span><div class="class-details"><div class="lesson" data-id="d20-1">10:00-11:35</div><div class="lesson" data-id="d20-2">11:45-13:20</div><div class="lesson" data-id="d20-3">13:30-15:05</div><div class="lesson" data-id="d20-4">15:15-16:50*</div><div class="class-location"><i class="bi bi-geo-alt-fill"></i> ul. Drobiarska 56</div></div></div><div class="col-12 col-md calendar-day weekend"><span class="mobile-day-name">ND</span><span class="day-number">21</span><div class="class-details"><div class="class-times text-muted">Wolne</div></div></div></div>
            <div class="row g-0"><div class="col-12 col-md calendar-day class-day"><span class="mobile-day-name">PN</span><span class="day-number">22</span><div class="class-details"><div class="lesson" data-id="d22-1">16:40-18:15</div><div class="class-location"><i class="bi bi-geo-alt-fill"></i> ul. Drobiarska 56</div></div></div><div class="col-12 col-md calendar-day class-day"><span class="mobile-day-name">WT</span><span class="day-number">23</span><div class="class-details"><div class="lesson" data-id="d23-1">16:40-18:15</div><div class="lesson" data-id="d23-2">18:25-20:00</div><div class="class-location"><i class="bi bi-geo-alt-fill"></i> ul. Drobiarska 56</div></div></div><div class="col-12 col-md calendar-day class-day"><span class="mobile-day-name">ŚR</span><span class="day-number">24</span><div class="class-details"><div class="lesson" data-id="d24-1">16:40-18:15</div><div class="lesson" data-id="d24-2">18:15-19:50</div><div class="class-location"><i class="bi bi-geo-alt-fill"></i> ul. Staszica 3A</div></div></div><div class="col-12 col-md calendar-day class-day"><span class="mobile-day-name">CZ</span><span class="day-number">25</span><div class="class-details"><div class="lesson" data-id="d25-1">16:40-18:15</div><div class="lesson" data-id="d25-2">18:25-20:00</div><div class="class-location"><i class="bi bi-geo-alt-fill"></i> ul. Staszica 3A</div></div></div><div class="col-12 col-md calendar-day class-day"><span class="mobile-day-name">PT</span><span class="day-number">26</span><div class="class-details"><div class="lesson" data-id="d26-1">16:40-18:15</div><div class="lesson" data-id="d26-2">18:25-20:00</div><div class="class-location"><i class="bi bi-geo-alt-fill"></i> ul. Staszica 3A</div></div></div><div class="col-12 col-md calendar-day class-day"><span class="mobile-day-name">SO</span><span class="day-number">27</span><div class="class-details"><div class="lesson" data-id="d27-1">10:00-11:35</div><div class="lesson" data-id="d27-2">11:45-13:20</div><div class="lesson" data-id="d27-3">13:30-15:05</div><div class="lesson" data-id="d27-4">15:15-16:50*</div><div class="class-location"><i class="bi bi-geo-alt-fill"></i> ul. Drobiarska 56</div></div></div><div class="col-12 col-md calendar-day weekend"><span class="mobile-day-name">ND</span><span class="day-number">28</span><div class="class-details"><div class="class-times text-muted">Wolne</div></div></div></div>
            <div class="row g-0"><div class="col-12 col-md calendar-day class-day"><span class="mobile-day-name">PN</span><span class="day-number">29</span><div class="class-details"><div class="lesson" data-id="d29-1">16:40-18:15</div><div class="class-location"><i class="bi bi-geo-alt-fill"></i> ul. Drobiarska 56</div></div></div><div class="col-12 col-md calendar-day class-day"><span class="mobile-day-name">WT</span><span class="day-number">30</span><div class="class-details"><div class="lesson" data-id="d30-1">16:40-18:15</div><div class="lesson" data-id="d30-2">18:25-20:00</div><div class="class-location"><i class="bi bi-geo-alt-fill"></i> ul. Drobiarska 56</div></div></div><div class="col-12 col-md calendar-day weekend"><span class="mobile-day-name">ŚR</span><span class="day-number text-muted"></span></div><div class="col-12 col-md calendar-day weekend"><span class="mobile-day-name">CZ</span><span class="day-number text-muted"></span></div><div class="col-12 col-md calendar-day weekend"><span class="mobile-day-name">PT</span><span class="day-number text-muted"></span></div><div class="col-12 col-md calendar-day weekend"><span class="mobile-day-name">SO</span><span class="day-number text-muted"></span></div><div class="col-12 col-md calendar-day weekend"><span class="mobile-day-name">ND</span><span class="day-number text-muted"></span></div></div>
        </div>
        <div class="mt-5">
            <h3 class="mb-3">Lokalizacje zajęć w Sulejówku</h3>
            <div class="row"><div class="col-lg-6 mb-3"><div class="card h-100 card-info"><div class="card-header card-header-custom"><i class="bi bi-geo-alt-fill me-2"></i> ul. Drobiarska 56</div><ul class="list-group list-group-flush"><li class="list-group-item"><strong>Sobota, Poniedziałek, Wtorek</strong></li></ul></div></div><div class="col-lg-6 mb-3"><div class="card h-100 card-info"><div class="card-header card-header-custom"><i class="bi bi-geo-alt-fill me-2"></i> ul. Staszica 3A</div><ul class="list-group list-group-flush"><li class="list-group-item"><strong>Środa, Czwartek, Piątek</strong></li></ul></div></div></div>
        </div>
    </div>
    
    <div class="modal fade" id="instructionsModal" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered"><div class="modal-content"><div class="modal-header"><h5 class="modal-title">Jak dodać skrót na pulpicie?</h5><button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button></div><div class="modal-body"><h6><i class="bi bi-android2 instruction-icon me-2"></i>Na Androidzie (Chrome)</h6><ol class="list-group list-group-numbered list-group-flush mb-4"><li class="list-group-item">Naciśnij przycisk menu <i class="bi bi-three-dots-vertical"></i> w prawym górnym rogu.</li><li class="list-group-item">Wybierz z listy opcję <strong>"Dodaj do ekranu głównego"</strong>.</li><li class="list-group-item">Potwierdź, naciskając <strong>"Dodaj"</strong>.</li></ol><h6><i class="bi bi-apple instruction-icon me-2"></i>Na iPhonie (Safari)</h6><ol class="list-group list-group-numbered list-group-flush"><li class="list-group-item">Naciśnij przycisk udostępniania <i class="bi bi-box-arrow-up"></i> na dolnym pasku.</li><li class="list-group-item">Przewiń w dół i wybierz <strong>"Do ekranu początkowego"</strong>.</li><li class="list-group-item">Potwierdź, naciskając <strong>"Dodaj"</strong> w prawym górnym rogu.</li></ol></div></div></div>
    </div>

    <script src="https://www.gstatic.com/firebasejs/9.6.1/firebase-app-compat.js"></script>
    <script src="https://www.gstatic.com/firebasejs/9.6.1/firebase-auth-compat.js"></script>
    <script src="https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore-compat.js"></script>
    <script src="https://www.gstatic.com/firebasejs/9.6.1/firebase-functions-compat.js"></script>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
    
    <script>
        // --- KONFIGURACJA FIREBASE ---
        const firebaseConfig = {
            apiKey: "AIzaSyCE6xfQ2tE7D7RcEPEGbudgfr89YrzKPgQ",
            authDomain: "plan-zajec-krzysia.firebaseapp.com",
            projectId: "plan-zajec-krzysia",
            storageBucket: "plan-zajec-krzysia.appspot.com",
            messagingSenderId: "537092156479",
            appId: "1:537092156479:web:81ebd589ec225aeb725c8a",
            measurementId: "G-7SG5R870HW"
        };
        firebase.initializeApp(firebaseConfig);
        const auth = firebase.auth();
        const db = firebase.firestore();
        const functions = firebase.functions('us-central1');

        // --- GŁÓWNY SKRYPT APLIKACJI ---
        document.addEventListener('DOMContentLoaded', () => {
            const LESSON_PRICE = 100;
            const EMPTY_LESSON_PRICE = 50;
            const loginContainer = document.getElementById('login-container');
            const contentContainer = document.getElementById('content-container');
            const loginForm = document.getElementById('login-form');
            const themeSwitch = document.getElementById('theme-switch');
            const logoutButton = document.getElementById('logout-button');
            const addToHomescreenButton = document.getElementById('add-to-homescreen');
            const notificationsButton = document.getElementById('notifications-button');
            const sendNotificationBtn = document.getElementById('send-notification-btn');
            
            let instructionsModal = null;
            let lessonStates = {};
            let userRole = 'user';
            let unsubscribe;
            let swRegistration = null;
            let currentUser = null;

            function updateSummary() {
                const completedCount = Object.values(lessonStates).filter(s => s === 'completed').length;
                const emptyCount = Object.values(lessonStates).filter(s => s === 'empty').length;
                const earnings = (completedCount * LESSON_PRICE) + (emptyCount * EMPTY_LESSON_PRICE);
                document.getElementById('lessons-summary').textContent = `${completedCount} (odbyte) / ${emptyCount} (puste)`;
                document.getElementById('earnings-summary').textContent = `${earnings} zł`;
            }

            function applyLessonStates() {
                document.querySelectorAll('.lesson').forEach(el => {
                    el.classList.remove('completed', 'empty');
                    const lessonId = el.dataset.id;
                    if (lessonStates[lessonId] === 'completed') el.classList.add('completed');
                    else if (lessonStates[lessonId] === 'empty') el.classList.add('empty');
                });
                updateSummary();
            }

            function setEditMode(isAdmin) {
                document.querySelectorAll('.lesson').forEach(lesson => lesson.classList.toggle('editable', isAdmin));
                document.getElementById('admin-panel').classList.toggle('d-none', !isAdmin);
                document.getElementById('user-panel').classList.toggle('d-none', isAdmin);
            }

            function showContent(user) {
                currentUser = user;
                loginContainer.style.display = 'none';
                contentContainer.style.display = 'block';
                
                db.collection('users').doc(user.uid).get().then(doc => {
                    if (doc.exists) {
                        userRole = doc.data().role;
                        setEditMode(userRole === 'admin');
                        initialisePushNotifications(); 
                    }
                });

                const docRef = db.collection('lessons').doc('september2025');
                unsubscribe = docRef.onSnapshot(doc => {
                    lessonStates = doc.exists ? doc.data() : {};
                    applyLessonStates();
                }, error => console.error("Błąd odczytu z Firestore:", error));
            }
            
            function logout() { auth.signOut(); }

            auth.onAuthStateChanged(user => {
                if (user) {
                    showContent(user);
                } else {
                    currentUser = null;
                    loginContainer.style.display = 'flex';
                    contentContainer.style.display = 'none';
                    if (unsubscribe) unsubscribe();
                }
            });

            loginForm.addEventListener('submit', (event) => {
                event.preventDefault();
                const emailInput = document.getElementById('email');
                const passwordInput = document.getElementById('password');
                const errorMessage = document.getElementById('error-message');
                
                auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL)
                    .then(() => auth.signInWithEmailAndPassword(emailInput.value, passwordInput.value))
                    .catch(error => {
                        console.error("Błąd logowania:", error);
                        errorMessage.style.display = 'block';
                    });
            });
            
            logoutButton.addEventListener('click', logout);
            
            document.querySelectorAll('.lesson').forEach(lesson => {
                lesson.addEventListener('click', () => {
                    if (userRole !== 'admin') return;
                    const lessonId = lesson.dataset.id;
                    const currentState = lessonStates[lessonId];
                    let newState = 'completed';
                    if (currentState === 'completed') newState = 'empty';
                    if (currentState === 'empty') newState = null;
                    
                    if (newState) {
                        lessonStates[lessonId] = newState;
                    } else {
                        delete lessonStates[lessonId];
                    }
                    
                    db.collection('lessons').doc('september2025').set(lessonStates)
                      .then(() => {
                          if (window.confirm("Czy chcesz wysłać powiadomienie o tej zmianie?")) {
                              const sendNotification = functions.httpsCallable('sendLessonUpdateNotification');
                              sendNotification({ status: newState })
                                .then(result => {
                                    console.log("Odpowiedź z funkcji powiadomień:", result);
                                    alert("Powiadomienie wysłane pomyślnie!");
                                })
                                .catch(err => {
                                    console.error("Błąd wysyłania powiadomienia:", err);
                                    alert("Błąd: " + err.message);
                                });
                          }
                      });
                });
            });

            addToHomescreenButton.addEventListener('click', () => {
                 if (!instructionsModal) instructionsModal = new bootstrap.Modal(document.getElementById('instructionsModal'));
                 instructionsModal.show();
            });

            const setTheme = (isDark) => {
                document.body.classList.toggle('dark-mode', isDark);
                themeSwitch.checked = isDark;
                localStorage.setItem('theme', isDark ? 'dark' : 'light');
            };
            themeSwitch.addEventListener('change', () => setTheme(themeSwitch.checked));
            const savedTheme = localStorage.getItem('theme');
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            setTheme(savedTheme ? savedTheme === 'dark' : prefersDark);
            
            const VAPID_PUBLIC_KEY = 'TUTAJ_WKLEJ_SWOJ_KLUCZ_PUBLICZNY';

            function urlB64ToUint8Array(base64String) {
                const padding = '='.repeat((4 - base64String.length % 4) % 4);
                const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
                const rawData = window.atob(base64);
                const outputArray = new Uint8Array(rawData.length);
                for (let i = 0; i < rawData.length; ++i) { outputArray[i] = rawData.charCodeAt(i); }
                return outputArray;
            }

            function initialisePushNotifications() {
                if ('serviceWorker' in navigator && 'PushManager' in window) {
                    navigator.serviceWorker.ready.then(reg => {
                        swRegistration = reg;
                        if(notificationsButton) notificationsButton.disabled = false;
                        reg.pushManager.getSubscription().then(subscription => {
                            updateSubscriptionButton(!!subscription);
                        });
                    });
                } else {
                    if(notificationsButton) notificationsButton.disabled = true;
                }
            }

            function updateSubscriptionButton(isSubscribed) {
                if(notificationsButton){
                    if (isSubscribed) {
                        notificationsButton.innerHTML = '<i class="bi bi-bell-fill"></i>';
                        notificationsButton.title = 'Powiadomienia są włączone';
                    } else {
                        notificationsButton.innerHTML = '<i class="bi bi-bell-slash"></i>';
                        notificationsButton.title = 'Włącz powiadomienia';
                    }
                }
            }

            function subscribeUser() {
                if (!currentUser) return;
                const applicationServerKey = urlB64ToUint8Array(VAPID_PUBLIC_KEY);
                swRegistration.pushManager.subscribe({ userVisibleOnly: true, applicationServerKey })
                .then(subscription => {
                    console.log('User is subscribed.');
                    return db.collection('subscriptions').doc(currentUser.uid).set(JSON.parse(JSON.stringify(subscription)));
                })
                .then(() => updateSubscriptionButton(true))
                .catch(err => console.error('Failed to subscribe the user: ', err));
            }
            
            if (notificationsButton) {
                notificationsButton.addEventListener('click', () => {
                    swRegistration.pushManager.getSubscription().then(subscription => {
                        if (subscription === null) {
                             Notification.requestPermission().then(permission => {
                                if (permission === 'granted') subscribeUser();
                            });
                        }
                    });
                });
            }
            
            if ('serviceWorker' in navigator) {
                navigator.serviceWorker.register('sw.js')
                    .then(reg => console.log('Service Worker: Registered'))
                    .catch(err => console.error('Service Worker: Error', err));
            }
        });
    </script>
</body>
</html>