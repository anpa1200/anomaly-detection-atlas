"""Synthetic illustration of fan-out, not a deployable detector or learned model."""
from collections import defaultdict
# Each row stands for one destination-port observation in the same five-minute window.
events = [("ordinary", port) for port in [443, 443, 443, 80]]
events += [("fanout", port) for port in [22, 80, 443, 445, 3389, 8080]]
events += [("approved-scanner", port) for port in [22, 80, 443, 445, 3389, 8080]]
approved = {"approved-scanner"}
ports = defaultdict(set)
for source, port in events:
    ports[source].add(port)
results = {}
for source in sorted(ports):
    results[source] = len(ports[source]) >= 5 and source not in approved
    print(f"{source}: distinct_ports={len(ports[source])} review={str(results[source]).lower()}")
assert results == {"ordinary": False, "fanout": True, "approved-scanner": False}
print("PASS: synthetic threshold and allowlist example; no network activity")
