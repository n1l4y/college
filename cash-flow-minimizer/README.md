# Cash-Flow-Minimizer

This system minimizes the **number of transactions** among multiple banks in the different corners of the world that use **different modes of payment**. There is one world bank (with all payment modes) to act as an intermediary between banks that have no common mode of payment.

To pick the first Bank, we calculate the **net amount** for every Bank by using the below formula and store them in list:

net amount = [Sum of all **credits**(_amounts to be received_)] - [Sum of all **debits**(_amounts to pay_)]

Now the idea is that we are finding the bank which has _minimum_ net amount(_max debtor_) (_say Bank X, net amount x_) and then finding the bank which has the _maximum_ net amount( _max creditor_) (_say Bank Y, net amount y_) and also has a common payment mode (_say M1_) with the former bank. Then we find _minimum_ of absolute value of x and y, lets call it z.\
Now X pays the amount z to Y. Then 3 cases may arrived:

1. If (magnitude of x) < y => X is completely settled and so removed from the list.
2. If (magnitude of x) > y => Y is completely settled and so removed from the list.
3. If (magnitude of x) = y => X and Y both are completely settled and so both are removed from the list.
