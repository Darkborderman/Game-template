#include "bullet.h"

bullet::bullet()
{
    this->setPixmap(QPixmap(":/res/black_bullet.png").scaled(50, 50));
}

void bullet::fly()
{
    setPos(x(), y() - 3);
    if(y() < 0) {
        delete this;
    }
}
