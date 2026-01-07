"""
Challenge data for Python Ghost Hunt
Each challenge has a template, hint, and expected output
"""

CHALLENGES = [
    {
        "id": 1,
        "title": "Stage 1: Print Statements",
        "lesson": """<h2>WHAT IS PRINT()?</h2>
<p>The print() function displays text and values to the screen.</p>

<h3>BASIC SYNTAX:</h3>
<code>print("Your text here")</code>

<h3>KEY POINTS:</h3>
<ul><li>Text inside quotes is printed exactly as written</li>
<li>Use single ('') or double ("") quotes</li>
<li>This is how Python shows information to the player</li></ul>

<h3>EXAMPLES:</h3>
<code>print("Welcome!")</code><br>
<code>print("Found the ghost!")</code><br>
<code>print("XP: 50")</code>

<h3>WHY IT MATTERS:</h3>
<p>Print is how you communicate with the player. Every message, score, and clue needs to be printed!</p>
        """,
        "template": 'print("")',
        "hint": 'Make the output say "Hello, Ghost Hunter"',
        "expected_output": "Hello, Ghost Hunter",
        "tool_unlocked": "Flashlight",
        "xp_reward": 50,
    },
    {
        "id": 2,
        "title": "Stage 2: Variables",
        "lesson": """<h2>WHAT IS A VARIABLE?</h2>
<p>A container that stores information you can use later. Think of it as a labeled box.</p>

<h3>CREATING A VARIABLE:</h3>
<code>variable_name = value</code>

<h3>EXAMPLES:</h3>
<code>message = "The ghost is in the attic"</code><br>
<code>player_name = "Ghost Hunter"</code><br>
<code>level = 1</code><br>
<code>found_ghost = True</code>

<h3>USING YOUR VARIABLE:</h3>
<p>Once created, use it anytime you need that value:</p>
<code>message = "Look behind the curtain!"</code><br>
<code>print(message)</code><br>
<span style="color: #4ec9b0;">→ prints: Look behind the curtain!</span><br><br>
<code>name = "Spectre"</code><br>
<code>print("Enemy: " + name)</code><br>
<span style="color: #4ec9b0;">→ prints: Enemy: Spectre</span>

<h3>WHY USE VARIABLES?</h3>
<ul><li>Store information for later use</li>
<li>Change values without rewriting code</li>
<li>Makes code easier to read and update</li>
<li>Use the same value many times</li></ul>
        """,
        "template": 'location = \nprint(location)',
        "hint": 'Set location to "The ghost is in the attic", then print it',
        "expected_output": "The ghost is in the attic",
        "tool_unlocked": "Thermal Detector",
        "xp_reward": 50,
    },
    {
        "id": 3,
        "title": "Stage 3: Math Operations",
        "lesson": """<h2>WHAT IS MATH IN PYTHON?</h2>
<p>Python can do calculations just like a calculator!</p>

<h3>THE FOUR BASIC OPERATIONS:</h3>
<ul><li><code>+</code> Addition → Example: 5 + 3 = 8</li>
<li><code>-</code> Subtraction → Example: 10 - 2 = 8</li>
<li><code>*</code> Multiplication → Example: 4 * 2 = 8</li>
<li><code>/</code> Division → Example: 16 / 2 = 8</li></ul>

<h3>PRINTING MATH:</h3>
<p>You can print calculations directly:</p>
<code>print(5 + 3)</code> <span style="color: #4ec9b0;">→ prints: 8</span><br>
<code>print(10 - 2)</code> <span style="color: #4ec9b0;">→ prints: 8</span><br>
<code>print(4 * 2)</code> <span style="color: #4ec9b0;">→ prints: 8</span>

<h3>USING WITH VARIABLES:</h3>
<code>xp_earned = 50 + 100</code><br>
<code>print(xp_earned)</code><br>
<span style="color: #4ec9b0;">→ prints: 150</span>

<h3>REAL WORLD EXAMPLES:</h3>
<code># Player collects coins<br>coins = 25 + 10<br>print(coins)</code><br>
<span style="color: #4ec9b0;">→ prints: 35</span><br><br>
<code># Calculate damage<br>damage = 20 * 2<br>print(damage)</code><br>
<span style="color: #4ec9b0;">→ prints: 40</span>

<h3>YOUR CHALLENGE:</h3>
<p>Create any equation that equals exactly 13 and print it.</p>
        """,
        "template": 'print()',
        "hint": 'Put a math equation inside print() that equals 13. Example: 10 + 3',
        "expected_output": "13",
        "tool_unlocked": "EMF Meter",
        "xp_reward": 50,
    },
    {
        "id": 4,
        "title": "Stage 4: String Concatenation",
        "lesson": """<h2>WHAT IS CONCATENATION?</h2>
<p>Joining multiple strings (text) together using the + operator.</p>

<h3>BASIC CONCATENATION:</h3>
<code>string1 + string2</code>

<h3>SIMPLE EXAMPLES:</h3>
<code>print("Hello" + " " + "World")</code><br>
<span style="color: #4ec9b0;">→ prints: Hello World</span><br><br>
<code>print("I am " + "a ghost hunter")</code><br>
<span style="color: #4ec9b0;">→ prints: I am a ghost hunter</span>

<h3>⚠️ IMPORTANT - SPACES MATTER:</h3>
<code>"Hello" + "World"</code> <span style="color: #4ec9b0;">→ HelloWorld (no space!)</span><br>
<code>"Hello" + " " + "World"</code> <span style="color: #4ec9b0;">→ Hello World (with space)</span><br>
<p><strong>Always add spaces where you need them!</strong></p>

<h3>WITH VARIABLES:</h3>
<code>name = "Spectre"</code><br>
<code>print("I found the " + name)</code><br>
<span style="color: #4ec9b0;">→ prints: I found the Spectre</span>

<h3>REMEMBER:</h3>
<ul><li>You can only join strings with +</li>
<li>Always include spaces where needed</li>
<li>Use variables to make it cleaner</li></ul>
        """,
        "template": 'first = \nmiddle = \nlast = \nprint()',
        "hint": 'Set first, middle, and last to build the sentence. Then use + to concatenate and print the result.',
        "expected_output": "I found the ghost",
        "tool_unlocked": "Spirit Box",
        "xp_reward": 50,
    },
]

def get_challenge(challenge_id: int):
    """Get a specific challenge by ID"""
    for challenge in CHALLENGES:
        if challenge["id"] == challenge_id:
            return challenge
    return None

def validate_output(challenge_id: int, actual_output: str) -> bool:
    """Check if the actual output matches the expected output"""
    challenge = get_challenge(challenge_id)
    if not challenge:
        return False
    return actual_output.strip() == challenge["expected_output"].strip()
