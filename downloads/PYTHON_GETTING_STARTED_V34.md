# Python for Data Analytics — beginner setup (Mastery v34)

This is a **ten-week, one-week-at-a-time** course. Use the week selector, or Previous/Next, to move between lessons. The examples use a **fictional** six-row retail orders file.

## Step 1: Get ready

1. Install Python 3.11 or later (or use a school-approved Python notebook environment).
2. Open a terminal in an empty project directory; check your version with `python --version` (on some systems, use `python3 --version` or Windows `py --version`).
3. Create a virtual environment: `python -m venv .venv`.
4. Activate it: Windows PowerShell `.venv\Scripts\Activate.ps1`; macOS/Linux `source .venv/bin/activate`.
5. Install `python -m pip install pandas numpy matplotlib`. Add these versions to a requirements file when submitting a project.

If PowerShell blocks activation, use the environment's Python executable directly (`.venv\Scripts\python.exe`) instead of changing your whole computer's security policy.

## Step 2: Place your sample data

Download [mastery_orders.csv](mastery_orders.csv), then put it in the same folder as your `.py` script, or give its full path to `pd.read_csv`.

```python
from pathlib import Path
import pandas as pd
print('Working folder:', Path.cwd())
orders = pd.read_csv('mastery_orders.csv', parse_dates=['order_date'])
print(orders.shape)                 # (6, 12)
print(orders[['order_id','status']].head())
```

## Step 3: Check your sales logic

```python
completed = orders.loc[orders['status'].eq('Completed')].copy()
completed['revenue'] = completed['quantity'] * completed['unit_price']
completed['profit'] = completed['quantity'] * (completed['unit_price'] - completed['unit_cost'])
print('Completed orders:', len(completed))
print('Revenue:', completed['revenue'].sum())
print('Profit:', completed['profit'].sum())
```

Expected output:

```text
Completed orders: 5
Revenue: 578000
Profit: 135000
```

These are training controls, not real sales claims. The SQL/Excel Practice Arena does not currently execute Python; run the code in a local Python environment or supported notebook instead.

## Your weekly routine

Read the **Why**, **How**, and **Step-by-step explanation** first. Run the worked code; verify the displayed output, then complete the **Practise** and **Check knowledge** tabs. Mark the week complete when you can explain the result without referring to the answer. Each week can be revisited at any time.
