# Gestione del database mediante Python con SQLAlchemy.

from sqlalchemy import Integer, String, DateTime
from sqlalchemy.sql.schema import Column
from sqlalchemy.sql import func
from database import Base
from dataclasses import dataclass


@dataclass
class list_shop(Base):
    __tablename__ = 'list_shop'
    id: int
    product_name: str
    amount: int
    price: int
    insertion_time: DateTime

    id = Column(Integer, primary_key=True)
    product_name = Column(String(100), nullable=False)
    amount = Column(Integer, nullable=False, default=1)
    price = Column(Integer, nullable=False, default=1)
    insertion_time = Column(DateTime, nullable=False, server_default=func.now())
