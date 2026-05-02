<!DOCTYPE html>
<html lang="ta">
<head>
  <meta charset="UTF-8">
  <title>Voting Dashboard</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <style>
    body {
      font-family: Arial, sans-serif;
      background: #f4f6f9;
      margin: 0;
      padding: 0;
    }

    .header {
      background: #0d6efd;
      color: white;
      text-align: center;
      padding: 20px;
      font-size: 22px;
      font-weight: bold;
    }

    .container {
      max-width: 500px;
      margin: 40px auto;
      background: white;
      padding: 25px;
      border-radius: 10px;
      box-shadow: 0 0 10px rgba(0,0,0,0.1);
    }

    h2 {
      text-align: center;
    }

    .option {
      margin: 15px 0;
      font-size: 18px;
    }

    button {
      width: 100%;
      padding: 12px;
      background: #0d6efd;
      color: white;
      border: none;
      border-radius: 8px;
      font-size: 18px;
      cursor: pointer;
    }

    button:hover {
      background: #0b5ed7;
    }

    .result {
      margin-top: 20px;
      text-align: center;
      font-weight: bold;
      color: green;
    }
  </style>
</head>

<body>

  <div class="header">
    🗳️ மக்கள் கருத்து பதிவு தளம்
  </div>

  <div class="container">
    <h2>உங்கள் கருத்தை பதிவு செய்யவும்</h2>

    <form id="voteForm">
      
      <div class="option">
        <input type="radio" name="vote" value="Support" required> 👍 Support
      </div>

      <div class="option">
        <input type="radio" name="vote" value="Against"> 👎 Against
      </div>

      <button type="submit">🗳️ Submit Vote</button>
    </form>

    <div class="result" id="result"></div>
  </div>

  <script>
    const form = document.getElementById("voteForm");
    const result = document.getElementById("result");

    form.addEventListener("submit", function(e) {
      e.preventDefault();

      const selected = document.querySelector('input[name="vote"]:checked').value;

      result.innerHTML = "உங்கள் vote பதிவு செய்யப்பட்டது: " + selected;

      form.reset();
    });
  </script>

</body>
</html>
