#include "mainwindow.h"
#include "ui_mainwindow.h"

#include <QDebug>

MainWindow::MainWindow(QWidget *parent) :
    QMainWindow(parent),
    ui(new Ui::MainWindow),
    scene(new QGraphicsScene(0, 0, 1201, 871)),
    timer(new QTimer)
{
    ui->setupUi(this);
    ui->graphicsView->setScene(scene);

    shooter=new bullet;
    scene->addItem(shooter);
    shooter->setPos(200, 200);
    timer->start(10);
}

MainWindow::~MainWindow()
{
    delete ui;
}

void MainWindow::keyPressEvent(QKeyEvent *e)
{
    switch(e->key()) {
    case Qt::Key_Up:
    case Qt::Key_W:
        shooter->setPos(shooter->x(), shooter->y() - 10);
        break;
    case Qt::Key_Down:
    case Qt::Key_S:
        shooter->setPos(shooter->x(), shooter->y() + 10);
        break;
    case Qt::Key_Left:
    case Qt::Key_A:
        shooter->setPos(shooter->x() - 10, shooter->y());
        break;
    case Qt::Key_Right:
    case Qt::Key_D:
        shooter->setPos(shooter->x() + 10, shooter->y());
        break;
    }
}

void MainWindow::mousePressEvent(QMouseEvent *e)
{
    bullet *b = new bullet;
    b->setPos(shooter->x() + shooter->pixmap().width() / 2 - b->pixmap().width() / 2, shooter->y() - b->pixmap().height());
    b->connect(timer, SIGNAL(timeout()), b, SLOT(fly()));
    scene->addItem(b);
}


































