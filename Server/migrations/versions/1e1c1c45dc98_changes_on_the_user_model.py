"""changes on the user model

Revision ID: 1e1c1c45dc98
Revises: 24585111ed17
Create Date: 2024-10-16 11:47:53.054003

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '1e1c1c45dc98'
down_revision = '24585111ed17'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.drop_column('email')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.add_column(sa.Column('email', sa.VARCHAR(), nullable=False))

    # ### end Alembic commands ###