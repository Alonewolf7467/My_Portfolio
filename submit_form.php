<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get form data
    $name = $_POST['name'];
    $email = $_POST['email'];
    $phone = $_POST['phone'];
    $message = $_POST['message'];

    // Database credentials
    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "query_data";

    // Create connection
    $conn = new mysqli($servername, $username, $password, $dbname);

    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    // Prepare and bind
    $stmt = $conn->prepare("INSERT INTO submission (name, email, phone, message) VALUES (?, ?, ?, ?)");
    $stmt->bind_param("ssis", $name, $email, $phone, $message);

    if ($stmt->execute()) {
        $success_message = "Your message sent successfully. You can go back...!";
    } else {
        $error_message = "Error: " . $stmt->error;
    }

    // Close the statement and connection
    $stmt->close();
    $conn->close();
}
?>

<!DOCTYPE html>
<html>
<head>
    <title>Pop-up Menu Box</title>
</head>
<body>
    <div id="popup">
        <div class="popup-content">
            <span class="close-button">&times;</span>
            <h2>Message Box</h2>
            <?php if (isset($success_message)) { ?>
                <p class="success-message"><?php echo $success_message; ?></p>
            <?php } elseif (isset($error_message)) { ?>
                <p class="error-message"><?php echo $error_message; ?></p>
            <?php } else { ?>
                <form method="post" action="<?php echo htmlspecialchars($_SERVER['PHP_SELF']); ?>">
                    <label for="name">Name:</label>
                    <input type="text" id="name" name="name" required>

                    <label for="email">Email:</label>
                    <input type="email" id="email" name="email" required>

                    <label for="phone">Phone:</label>
                    <input type="text" id="phone" name="phone" required>

                    <label for="message">Message:</label>
                    <textarea id="message" name="message" required></textarea>

                    <button type="submit">Submit</button>
                </form>
            <?php } ?>
        </div>
    </div>
</body>
</html>