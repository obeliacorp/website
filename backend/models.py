import datetime
from sqlalchemy import create_engine, Column, Integer, String, DateTime
from sqlalchemy.orm import declarative_base, sessionmaker

engine = create_engine('sqlite:///submissions.db')
Base = declarative_base()
Session = sessionmaker(bind=engine)

class Submission(Base):
    __tablename__ = 'submissions'
    id = Column(Integer, primary_key=True)
    name = Column(String)
    email = Column(String)
    business = Column(String)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

Base.metadata.create_all(engine)