"""alter_table_users_created_at_timezone

Revision ID: 5a5e7b0e926e
Revises: ed0429781b95
Create Date: 2026-08-01 19:34:14.326967

"""

from collections.abc import Sequence

from alembic import op

# revision identifiers, used by Alembic.
revision: str = "5a5e7b0e926e"
down_revision: str | Sequence[str] | None = "ed0429781b95"
branch_labels: str | Sequence[str] | None = None
depends_on: str | Sequence[str] | None = None


def upgrade() -> None:
    """Upgrade schema."""
    upgrade_sql = """
    ALTER TABLE users
        ALTER COLUMN created_at TYPE timestamptz
        USING created_at AT TIME ZONE 'UTC';
    """
    op.execute(upgrade_sql)


def downgrade() -> None:
    """Downgrade schema."""
    downgrade_sql = """
    ALTER TABLE users
        ALTER COLUMN created_at TYPE timestamp
        USING created_at AT TIME ZONE 'UTC';
    """
    op.execute(downgrade_sql)
