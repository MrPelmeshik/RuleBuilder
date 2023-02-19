from dataclasses import dataclass
from typing import Any


@dataclass
class FilterType:
    field: str
    type: type
    value: Any
